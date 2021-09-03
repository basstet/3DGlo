// калькулятор:
const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');
  let animTotal,
      isAnimate = false;

  // подсчет итоговой суммы:
  const countSum = () => {
    let total = 0,
        countValue = 1,
        dayValue = 1,
        count = 0;
    const typeValue = calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    // эффект перебора цифр:
    let risingTotal = 0;
    const animSpeed = Math.floor(total / 60),
          totalRemainder = total % 60;

    count = total;

    if (!isAnimate) {
      cancelAnimationFrame(animTotal);
    }
    isAnimate = true;

    const changeTotal = () => {
      animTotal = requestAnimationFrame(changeTotal);

      if (isAnimate && total > 0 && count > 0) {
        if (count > totalRemainder) {
          risingTotal += animSpeed * 1;
          totalValue.textContent = risingTotal;
          count -= animSpeed;
        } else {
          // когда счетчик меньше остатка от деления:
          totalValue.textContent = total;
          count = 0;
          cancelAnimationFrame(animTotal);
        }
      } else {
        cancelAnimationFrame(animTotal);
      }
    };

    animTotal = requestAnimationFrame(changeTotal);
  };

  // изменение "Итого" при изменении значения полей:
  calcBlock.addEventListener('change', event => {
    const target = event.target;

    if (target.matches('select, input')) {
      isAnimate = false;
      totalValue.textContent = '';
      countSum();
    }
  });
};

export default calc;
