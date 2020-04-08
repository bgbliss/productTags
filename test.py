# class Solution:
#     def reverse(self, x: int) -> int:
#         if x >= 2**31-1 or x <= -2**31: print(0)
#         else:
#             strg = str(x)
#             print(strg)
#             if x >= 0 :
#                 revst = strg[::-1]
#                 print(revst)
#             else:
#                 temp = strg[1:] 
#                 temp2 = temp[::-1] 
#                 revst = "-" + temp2
#             if int(revst) >= 2**31-1 or int(revst) <= -2**31: print(0)
#             else: return (int(revst))

# number = Solution()
# number.reverse(12030000)

print(int("0001112"))