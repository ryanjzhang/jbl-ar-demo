"use strict";

/*
The code below handles the hamburger menu that is only displayed
on mobile devices.
*/
document.addEventListener("DOMContentLoaded", function () {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function (el) {
      el.addEventListener("click", function () {
        // Get the target from the "data-target" attribute
        var target = el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

/*
The code below detexts the operating system of the device of the current user.
uses the getMobileOperatingSystem() function.
sets ios.stye.display = "block" if operating system is iOS
sets android.style.display = "block" if operating system is not iOS
*/
function showARElement() {
  var android = document.getElementById("android");
  var ios = document.getElementById("ios");
  if (getMobileOperatingSystem() == "iOS") {
    ios.style.display = "block";
  }
  // If OS is not iOS, use Android implementation since that is more interactive for Windows users than the iOS implementation.
  else {
      android.style.display = "block";
    }
}

/* 
Determine the mobile operating system. 
This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'. 
@returns { String } 
*/
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

$(document).ready(function () {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav"
  });

  $(".slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 2,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    focusOnSelect: true
  });
});