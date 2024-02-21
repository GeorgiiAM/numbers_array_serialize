class EncodeDecodeClass {
    constructor() {
        this.string_for_coding = "abcdefghij";
        this.map_for_encoding = {};
        this.map_for_decoding = {};
        this.init();
    }

    init() {
        let index = 0;
        for (let i of this.string_for_coding) {
            this.map_for_encoding[index.toString()] = i;
            this.map_for_decoding[i] = index.toString();
            index++;
        }
    }

    encode(array) {
        let result = [];
        for (let i of array) {
            let number = "";
            for (let j of i.toString()) {
                number += this.map_for_encoding[j];
            }
            result.push(number);
        }
        return result.join(",");
    }

    decode(string) {
        let result = [];
        let split_s = string.split(",");
        for (let i of split_s) {
            let number = "";
            for (let j of i) {
                number += this.map_for_decoding[j];
            }
            result.push(parseInt(number));
        }
        return result;
    }

    encode2(array) {
        let result = "";
        for (let i of array) {
            let number = "";
            for (let j of i.toString()) {
                number += this.map_for_encoding[j];
            }
            result += number.charAt(0).toUpperCase() + number.slice(1);
        }
        return result;
    }

    decode2(string) {
        let result = [];
        let text = "";
        let number = "";
        for (let i of string) {
            if (i === i.toUpperCase()) {
                if (text.length > 0) {
                    for (let j of text) {
                        number += this.map_for_decoding[j];
                    }
                    result.push(parseInt(number));
                    text = "";
                    number = "";
                }
                text += i.toLowerCase();
            } else {
                text += i;
            }
        }

        for (let j of text) {
            number += this.map_for_decoding[j];
        }
        result.push(parseInt(number));
        return result;
    }
}

function test(algorithm_type = 1, lower_array_length_limit = 1, upper_array_length_limit = 1000, number_in_array = "RANDOM") {
    if (number_in_array === "RANDOM") {
        console.log("\nRandom number array encoding test. Random numbers in range [1, 300].");
    } else if (typeof number_in_array === "number") {
        console.log("\nNumber array encoding test. All numbers are equal to ", number_in_array);
    } else {
        return;
    }
    console.log("Array length in range [", lower_array_length_limit, ", ", upper_array_length_limit, "].");
    console.log("Algorithm type: ", algorithm_type);

    const edc = new EncodeDecodeClass();

    let test_count = 0;
    let percent_sum = 0;
    let test_arr = [];

    for (let i = lower_array_length_limit; i <= upper_array_length_limit; i++) {
        if (number_in_array === "RANDOM") {
            test_arr = Array.from({
                length: i
            }, () => Math.floor(Math.random() * 300) + 1);
        } else if (typeof number_in_array === "number") {
            test_arr = Array.from({
                length: i
            }, () => number_in_array);
        } else {
            continue;
        }

        let encoded_str = "";
        let decoded_str = "";

        if (algorithm_type === 1) {
            encoded_str = edc.encode(test_arr);
            decoded_str = edc.decode(encoded_str);
        } else {
            encoded_str = edc.encode2(test_arr);
            decoded_str = edc.decode2(encoded_str);
        }

        console.assert(JSON.stringify(test_arr) === JSON.stringify(decoded_str));

        const size_before_encode = JSON.stringify(test_arr).length;
        const size_after_encode = encoded_str.length;
        const compression_percentage = 100 - size_after_encode * 100 / size_before_encode;
        percent_sum += compression_percentage;
        test_count++;
    }

    const average_compression_coefficient = percent_sum / test_count;
    console.log("average compression coefficient =", average_compression_coefficient);
}

console.log("\nNumeric array serialization test");

console.log("\n\nTest 1");
test(1, 1, 1000, "RANDOM");
test(2, 1, 1000, "RANDOM");

console.log("\n\nTest 2");
test(1, 1, 1000, 1);
test(2, 1, 1000, 1);

console.log("\n\nTest 3");
test(1, 1, 1000, 300);
test(2, 1, 1000, 300);

console.log("\n\nTest 4");
test(1, 1, 10, "RANDOM");
test(2, 1, 10, "RANDOM");

console.log("\n\nTest 5");
test(1, 900, 1000, "RANDOM");
test(2, 900, 1000, "RANDOM");