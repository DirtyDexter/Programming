// Given a rod of length n inches and an array of prices that contains prices of all pieces of size smaller than n.
// Determine the maximum value obtainable by cutting up the rod and selling the pieces

package main

import (
	"fmt"
	"math"
)

func main() {
	// priceList index represents length of rod
	priceList := []int{3, 5, 8, 9, 10, 17, 17, 20, 24, 30}
	rodLength := 8
	revenueList, sizeList := BottomUpRodCut(priceList, rodLength)
	fmt.Println("Revenue list by BottomUpRodCut :: ", revenueList)
	fmt.Println("Size list by BottomUpRodCut :: ", sizeList)
	fmt.Printf("Max revenue for rodLength-%d is, %d\n", rodLength, revenueList[rodLength])
	fmt.Print("Cut Lengths are :: ")
	PrintRodCutSize(sizeList, rodLength)

	revenueList, sizeList = TopDownRodCut(priceList, rodLength)
	fmt.Println("Revenue list by TopDownRodCut :: ", revenueList)
	fmt.Println("Size list by TopDownRodCut :: ", sizeList)
	fmt.Printf("Max revenue for rodLength-%d is, %d\n", rodLength, revenueList[rodLength])
	fmt.Print("Cut Lengths are :: ")
	PrintRodCutSize(sizeList, rodLength)
}

// BottomUpRodCut using bottom up approach of Dynamic Programming
func BottomUpRodCut(priceList []int, rodLength int) ([]int, []int) {
	revenueList := make([]int, rodLength+1, rodLength+1)
	sizeList := make([]int, rodLength+1, rodLength+1)
	revenueList[0] = 0
	sizeList[0] = 0
	for i := 1; i <= rodLength; i++ {
		q := math.MinInt64
		for j := 1; j <= i; j++ {
			if q < priceList[j-1]+revenueList[i-j] {
				q = priceList[j-1] + revenueList[i-j]
				sizeList[i] = j
			}
		}
		revenueList[i] = q
	}
	return revenueList, sizeList
}

// TopDownRodCut using top down approach of Dynamic Programming
func TopDownRodCut(priceList []int, rodLength int) ([]int, []int) {
	revenueList := make([]int, rodLength+1, rodLength+1)
	sizeList := make([]int, rodLength+1, rodLength+1)
	for i := range revenueList {
		revenueList[i] = math.MinInt64
	}
	mamoizedRodCut(priceList, revenueList, sizeList, rodLength)
	return revenueList, sizeList
}

func mamoizedRodCut(priceList []int, revenueList []int, sizeList []int, rodLength int) int {
	if revenueList[rodLength] >= 0 {
		return revenueList[rodLength]
	}
	q := math.MinInt64
	if rodLength == 0 {
		q = 0
	} else {
		for i := 1; i <= rodLength; i++ {
			tmp := priceList[i-1] + mamoizedRodCut(priceList, revenueList, sizeList, rodLength-i)
			if q < tmp {
				q = tmp
				sizeList[rodLength] = i
			}
		}
	}
	revenueList[rodLength] = q
	return revenueList[rodLength]
}

// PrintRodCutSize print where to cut rod
func PrintRodCutSize(size []int, roadLength int) {
	if roadLength == 0 {
		fmt.Println(0)
		return
	}

	for roadLength > 0 {
		fmt.Printf("%d\t", size[roadLength])
		roadLength = roadLength - size[roadLength]
	}
	fmt.Println()
}
