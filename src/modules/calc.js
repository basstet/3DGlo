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
  const countSum = prevTotal => {
    let total = 0,
        countValue = 1,
        dayValue = 1,
        totalDiff = 0,
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
    totalDiff = total - prevTotal;
    count = totalDiff;
    if (!isAnimate) {
      cancelAnimationFrame(animTotal);
    }
    isAnimate = true;

    const changeTotal = () => {
      animTotal = requestAnimationFrame(changeTotal);

      if (isAnimate && totalDiff > 0 && count > 0) {
        totalValue.textContent = ++prevTotal;
        count = totalDiff--;
      } else if (isAnimate && totalDiff < 0 && count < 0) {
        totalValue.textContent = --prevTotal;
        count = totalDiff++;
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
      const prevTotal = +totalValue.textContent;
      countSum(prevTotal);
    }
  });
};

export default calc;
