# Calculator Web App
#### Video Demo:  <https://youtu.be/x0WOcwJwgJI>
#### Description:
This project is a web-app calculator written in JavaScript. I worked alone, and chose this project because calculators are commonly used and deceptively complex to build. The experience I gained of HTML and CSS through the CS50 course set me in good stead for creating the webpage and user interface. This project required me to practice JavaScript independently, which was the biggest challenge I faced.

The first step of this project was creating the HTML file. A simple page was created, using button elements to represent each key on the calculator. CSS grid was used to neatly arrange the keys into a grid-like format. The user interface was created with Bootstrap's container class. There are several features which I added to create a better user experience.

* When the user hits an operator key, it becomes highlighted to let the user know it is active. It is then released once a number key is selected.
* When the user hits any key, the opacity is increased to let the user know it has been selected.
* Operator keys and the clear key are coloured differently to number keys to let the user know they have a function.

The user interface is based on the Apple iPhone calculator, with orange operator buttons (x, +, -, /), and grey number buttons. This layout is simple and a good starting point for a first solo project.

An event listener was used to sense user actions. JavaScript functions were then created to bring the calculator to life. The functions are as follows:

* inputDigit. When the user clicks a number button, this function displays the number in the calculator display.
* inputDecimal. When the user clicks the decimal button, this function displays either appends a decimal onto the displayed number, or, sets the display as '0.'.
* handleOperator. When the user clicks an operator button, this function stores the displayed number as the first operand in the calculation. The clicked operator is stored as the operator in the calculation. If the = button is clicked, this function uses the calculate function to calculate the result of the function.
* calculate. This function takes the first and second operands, and the operator as arguments and returns the result of the calculation.
* resetCalculator. This function resets the calculator when the reset button is clicked.
* updateDisplay. This is a helper function used to update the calculator display after changes have been made.

Once a working calculator was made, there were still bugs to iron out. I wanted to create the feature where the user could click the = button after the calculation has been carried out, a subsequent calculation should be performed, using the result of the first equation. Another challenge was setting the maximum number of digits to be displayed on the calculator. After the result surpassed 9999999, I used the .toExponential(5) to change the answer to scientific notation, so that it would always fit on the screen.

It was a great project to get started with, and I hope to create many more web apps like this one.