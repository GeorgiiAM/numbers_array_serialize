from sys import getsizeof
import random


class EncodeDecodeClass:
    string_for_coding = "abcdefghij"
    ascii_arr = ""
    map_for_encoding = {}
    map_for_decoding = {}

    def __init__(self):
        index = 0
        for i in self.string_for_coding:
            self.map_for_encoding[str(index)] = i
            self.map_for_decoding[i] = str(index)
            index += 1

    def encode(self, array):
        result = []
        for i in array:
            number = ""
            for j in str(i):
                number = number + self.map_for_encoding[j]
            result.append(number)
        return ",".join(result)

    def decode(self, string):
        rezult = []
        split_s = string.split(",")
        for i in split_s:
            number = ""
            for j in i:
                number += self.map_for_decoding[j]
            rezult.append(int(number))
        return rezult

    def encode2(self, array):
        result = ""
        for i in array:
            number = ""
            for j in str(i):
                number = number + self.map_for_encoding[j]
            result += number.capitalize()
        return result

    def decode2(self, string):
        result = []
        text = ""
        number = ""
        for i in string:
            if i.isupper():
                if len(text) > 0:
                    for j in text:
                        number += self.map_for_decoding[j]
                    result.append(int(number))
                    text = ""
                    number = ""
                text += i.lower()
            else:
                text += i

        for j in text:
            number += self.map_for_decoding[j]
        result.append(int(number))
        return result


def test(algorithm_type=1, lower_array_length_limit=1, upper_array_length_limit=1000, number_in_array="RANDOM"):
    if number_in_array == "RANDOM":
        print("Random number array encoding test. Random numbers in range [1, 300].")
    elif isinstance(number_in_array, int):
        print("Number array encoding test. All numbers are equal to ", number_in_array)
    else:
        return
    print("Array length in range [", lower_array_length_limit, ", ", upper_array_length_limit, "].")
    print("Algorithm type: ", algorithm_type)

    edc = EncodeDecodeClass()

    test_count = 0
    percent_sum = 0
    test_arr = []

    for i in range(lower_array_length_limit, upper_array_length_limit + 1):
        if number_in_array == "RANDOM":
            test_arr = [random.randint(1, 300) for i in range(0, i + 1)]
        elif isinstance(number_in_array, int):
            test_arr = [number_in_array for i in range(0, i + 1)]
        else:
            continue

        encoed_str = decoed_str = ""
        if algorithm_type == 1:
            encoed_str = edc.encode(test_arr)
            decoed_str = edc.decode(encoed_str)
        else:
            encoed_str = edc.encode2(test_arr)
            decoed_str = edc.decode2(encoed_str)

        assert (test_arr == decoed_str)

        size_before_encode = getsizeof(test_arr)
        size_after_encode = getsizeof(encoed_str)
        compression_percentage = 100 - size_after_encode * 100 / size_before_encode
        percent_sum += compression_percentage
        test_count += 1

    average_compression_coefficient = percent_sum / test_count
    print("average compression coefficient = ", average_compression_coefficient)


if __name__ == "__main__":
    print("Numeric array serialization test")

    print("\nTest 1")
    test(1, 1, 1000, "RANDOM")
    test(2, 1, 1000, "RANDOM")

    print("\nTest 2")
    test(1, 1, 1000, 1)
    test(2, 1, 1000, 1)

    print("\nTest 3")
    test(1, 1, 1000, 300)
    test(2, 1, 1000, 300)

    print("\nTest 4")
    test(1, 1, 10, "RANDOM")
    test(2, 1, 10, "RANDOM")

    print("\nTest 5")
    test(1, 900, 1000, "RANDOM")
    test(2, 900, 1000, "RANDOM")
