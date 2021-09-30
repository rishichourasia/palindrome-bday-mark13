const date = document.querySelector(".date-input");
const btn = document.querySelector(".btn");
const message = document.querySelector(".message");
const gif = document.querySelector(".gif");

function reverseDate(str) {
	const strChar = str.split("");
	const reverseChar = strChar.reverse();
	const reverseStr = reverseChar.join("");
	return reverseStr;
}

function checkPalindrome(str) {
	const reversed = reverseDate(str);
	return reversed === str;
}

function convertToStr(date) {
	const dateStr = { date: "", month: "", year: "" };

	if (date.date < 10) {
		dateStr.date = "0" + date.date;
	} else {
		dateStr.date = date.date.toString();
	}

	if (date.month < 10) {
		dateStr.month = "0" + date.month;
	} else {
		dateStr.month = date.month.toString();
	}

	dateStr.year = date.year.toString();

	return dateStr;
}

function checkEveryFormat(date) {
	const convertedDate = convertToStr(date);

	var ddmmyyyy = convertedDate.date + convertedDate.month + convertedDate.year;
	var mmddyyyy = convertedDate.month + convertedDate.date + convertedDate.year;
	var yyyymmdd = convertedDate.year + convertedDate.month + convertedDate.date;
	var ddmmyy =
		convertedDate.date + convertedDate.month + convertedDate.year.slice(-2);
	var mmddyy =
		convertedDate.month + convertedDate.date + convertedDate.year.slice(-2);
	var yymmdd =
		convertedDate.year.slice(-2) + convertedDate.month + convertedDate.date;

	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function loopOverPalindromeformat(date) {
	const palindromeList = checkEveryFormat(date);

	var flag = false;
	for (i = 0; i < palindromeList.length; i++) {
		if (checkPalindrome(palindromeList[i])) {
			flag = true;
			break;
		}
	}
	return flag;
}

function remove() {
	message.innerText = "";
	gif.innerHTML = "";
}

// const dateObj = {
// 	date: 8,
// 	month: 8,
// 	year: 2021,
// };

function checkLeapYear(year) {
	if (year % 400 === 0) {
		return true;
	}
	if (year % 100 === 0) {
		return false;
	}
	if (year % 400 === 0) {
		return true;
	}
	return false;
}

function getNextDate(date) {
	var day = date.date + 1;
	var month = date.month;
	var year = date.year;

	const daysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (month === 2) {
		if (checkLeapYear(year)) {
			if (day > 29) {
				day = 1;
				month++;
			}
		} else {
			if (day > 28) {
				day = 1;
				month++;
			}
		}
	} else {
		if (day > daysinMonth[month - 1]) {
			day = 1;
			month++;
		}
	}

	if (month > 12) {
		month = 1;
		year++;
	}

	return {
		date: day,
		month: month,
		year: year,
	};
}

function getNextPalindrome(date) {
	var counter = 0;
	var nextDate = getNextDate(date);

	while (1) {
		counter++;
		var isPalindrome = loopOverPalindromeformat(nextDate);
		if (isPalindrome) {
			break;
		}
		nextDate = getNextDate(nextDate);
	}

	return [counter, nextDate];
}

// console.log(getNextPalindrome(dateObj));
// console.log(loopOverPalindromeformat(dateObj));

function clickHandler() {
	var dateInput = date.value;

	if (dateInput !== "") {
		var listOfDate = dateInput.split("-");

		var dateObj = {
			date: Number(listOfDate[2]),
			month: Number(listOfDate[1]),
			year: Number(listOfDate[0]),
		};
		var isItPalindrome = loopOverPalindromeformat(dateObj);
		if (isItPalindrome) {
			message.innerText = "Yay ! Your Birthday is palindrome ! 🥳 ";
			message.style.color = "green";
			gif.style.display = "contents";
			gif.innerHTML = `<img src="https://cdn.dribbble.com/users/485199/screenshots/10182475/media/272841ee1a15d45abd64aee8dca73510.png?compress=1&resize=400x300" alt="stonk-image">`;
		} else {
			var [counter, nextDate] = getNextPalindrome(dateObj);
			message.innerText = `The Next Palindrome birthday is ${nextDate.date}-${nextDate.month}-${nextDate.year}. You missed it by ${counter} Days 😥.`;
			message.style.color = "red";
			gif.style.display = "contents";
			gif.innerHTML = `<img src="https://www.sorryimages.love/images/quotes/english/general/sorry-emoji-face-52650-14193.jpg" alt="stonk-image">`;
		}
	} else {
		message.innerText = "Please Enter Birthday Date";
	}
}

btn.addEventListener("click", clickHandler);
