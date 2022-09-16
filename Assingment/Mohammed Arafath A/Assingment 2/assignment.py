# create a list

a = [10, 55, 24, 6, "Ram"]
print(a)

# using insert function
a.insert(1, 67)
print(a)

# using remove function
a.remove(6)
print(a)

# using append function
a.append(12)
print(a)

# using sort function in list b
b = [1, 45, 78, 24, 9, 26, 34, 81]
b.sort()
print(b)

# using pop function
a.pop()
print(a)

# using reverse function
a.reverse()
print(a)
print()

# Calculator program
a = int(input("Enter the first num : "))
b = int(input("Enter the second num : "))
while(True):
    print("1. Addition\n2. Subtraction\n3. Multiplication\n4. Division\n5. Modulo Division")
    choice = int(input("Enter your Choice : "))
    if(choice == 1):
        print("Addition is ", a+b)
    elif(choice == 2):
        print("Subtraction is ", a-b)
    elif(choice == 3):
        print("Multiplication is ", a*b)
    elif(choice == 4):
        print("Division is ", a/b)
    elif(choice == 5):
        print("Modulo Division is ", a % b)
    else:
        print("Enter the valid Operation.")
        break

print("\nProgram for String concat, reverse and slicing")
print()
n = input()

# String Concat
temp = input()
print(n+temp)

# String Reverse
print(n[::-1])

# String Slicing
print(temp[1:6])
print()
print(temp[-2:-8])
print()
print(temp[3:10:-1])
