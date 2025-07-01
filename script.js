const array = [];
let n = 50; // default
let p = 20;
let fs = 1;

document.addEventListener('DOMContentLoaded', () => {
    const visualizer = document.getElementById('visualizer');
    const rangeInput = document.getElementById("barCount");
    const rangeValue = document.getElementById("barCountValue");
    const generateBtn = document.getElementById("generate");

    // Range slider update
    rangeInput.addEventListener("input", () => {
        rangeValue.textContent = rangeInput.value;
    });

    // Generate bars
    generateBtn.addEventListener("click", generateBars);

    function generateBars() {
        visualizer.innerHTML = '';
        array.length = 0;
        n = parseInt(rangeInput.value);

        // Determine bar width and font size based on number
        if (n <= 30) {
            p = 40;
            fs = 1.5;
        } else if (n <= 70) {
            p = 20;
            fs = 1;
        } else {
            p = 8;
            fs = 0.5;
        }

        for (let i = 0; i < n; i++) {
            const value = Math.floor(Math.random() * 300) + 40;
            array.push(value);

            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${value}px`;
            bar.innerText = `${value}`;
            bar.style.fontSize = `${fs}rem`;
            bar.style.width = `${p}px`;
            visualizer.appendChild(bar);
        }
    }

    // Preset buttons
    document.getElementById("a1").addEventListener("click", () => {
        rangeInput.value = 20;
        rangeValue.textContent = 20;
        generateBars();
    });
    document.getElementById("a2").addEventListener("click", () => {
        rangeInput.value = 50;
        rangeValue.textContent = 50;
        generateBars();
    });
    document.getElementById("a3").addEventListener("click", () => {
        rangeInput.value = 100;
        rangeValue.textContent = 100;
        generateBars();
    });

    // Bubble Sort
    document.getElementById("a4").addEventListener("click", async () => {
        const bars = document.querySelectorAll('.bar');
        for (let i = 0; i < bars.length - 1; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                bars[j].style.backgroundColor = '#FF5733';
                bars[j + 1].style.backgroundColor = '#FF5733';

                if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                    await swapBars(bars[j], bars[j + 1]);
                }

                bars[j].style.backgroundColor = '#4CAF50';
                bars[j + 1].style.backgroundColor = '#3498DB';
            }
            bars[bars.length - i - 1].classList.add("sorted");
        }
        bars[0].classList.add("sorted");
    });

    // Insertion Sort
    document.getElementById("a6").addEventListener("click", async () => {
        const bars = document.querySelectorAll('.bar');
        for (let i = 1; i < bars.length; i++) {
            const key = parseInt(bars[i].style.height);
            bars[i].style.backgroundColor = '#FF5733';
            let j = i - 1;
            while (j >= 0 && parseInt(bars[j].style.height) > key) {
                bars[j + 1].style.height = bars[j].style.height;
                bars[j + 1].innerText = bars[j + 1].style.height.replace('px', '');
                bars[j].style.backgroundColor = '#FF5733';
                await delay(50);
                bars[j].style.backgroundColor = '#4CAF50';
                j--;
            }
            bars[j + 1].style.height = `${key}px`;
            bars[j + 1].innerText = key;
            bars[i].style.backgroundColor = '#4CAF50';
        }
        bars.forEach(bar => bar.classList.add("sorted"));
    });

    // Selection Sort
    document.getElementById("a5").addEventListener("click", async () => {
        const bars = document.querySelectorAll('.bar');
        for (let i = 0; i < bars.length; i++) {
            let minIndex = i;
            bars[minIndex].style.backgroundColor = '#FF5733';

            for (let j = i + 1; j < bars.length; j++) {
                bars[j].style.backgroundColor = '#FF5733';
                await delay(50);
                if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                    bars[minIndex].style.backgroundColor = '#4CAF50';
                    minIndex = j;
                    bars[minIndex].style.backgroundColor = '#FF5733';
                } else {
                    bars[j].style.backgroundColor = '#4CAF50';
                }
            }

            await swapBars(bars[i], bars[minIndex]);
            bars[minIndex].style.backgroundColor = '#4CAF50';
            bars[i].classList.add("sorted");
        }
    });

    // Merge Sort
    document.getElementById("a7").addEventListener("click", () => {
        const bars = document.querySelectorAll('.bar');
        mergeSort(bars, 0, bars.length - 1);
    });

    async function mergeSort(bars, left, right) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        await mergeSort(bars, left, mid);
        await mergeSort(bars, mid + 1, right);
        await merge(bars, left, mid, right);
    }

    async function merge(bars, left, mid, right) {
        const temp = [];
        let i = left, j = mid + 1;
        while (i <= mid && j <= right) {
            bars[i].style.backgroundColor = '#FF5733';
            bars[j].style.backgroundColor = '#FF5733';
            await delay(50);

            if (parseInt(bars[i].style.height) <= parseInt(bars[j].style.height)) {
                temp.push(parseInt(bars[i].style.height));
                bars[i].style.backgroundColor = '#4CAF50';
                i++;
            } else {
                temp.push(parseInt(bars[j].style.height));
                bars[j].style.backgroundColor = '#4CAF50';
                j++;
            }
        }
        while (i <= mid) temp.push(parseInt(bars[i++].style.height));
        while (j <= right) temp.push(parseInt(bars[j++].style.height));

        for (let k = left; k <= right; k++) {
            bars[k].style.height = `${temp[k - left]}px`;
            bars[k].innerText = temp[k - left];
            bars[k].style.backgroundColor = '#3498DB';
            await delay(30);
        }

        if (right - left + 1 === n) {
            for (let k = left; k <= right; k++) {
                bars[k].classList.add("sorted");
            }
        }
    }

    // Helpers
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function swapBars(bar1, bar2) {
        return new Promise(resolve => {
            setTimeout(() => {
                const temp = bar1.style.height;
                bar1.style.height = bar2.style.height;
                bar2.style.height = temp;

                const txt = bar1.innerText;
                bar1.innerText = bar2.innerText;
                bar2.innerText = txt;

                resolve();
            }, 50);
        });
    }
});
