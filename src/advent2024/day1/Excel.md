# Excel solution

## Copy Input
- `ctrl+c ctrl+v` INTO column A

## Init columns
- `=LEFT(A2;5)`
- copy formula
- `=RIGHT(A2;5)`
- copy formula

## Copy values
- `ctrl+c`
- `ctrl+v ctrl` values INTO column K and M
- add filter
- sort asc

## Part 1
- `=ABS(K2-M2)` column O
- copy formula
- `=SUM(O2:O1001)`

## Part 2
- `=COUNTIF($M$2:$M$1001;K2)*K2` column R
- copy formula
- `=SUM(R2:R1001)`
