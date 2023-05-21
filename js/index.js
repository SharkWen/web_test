window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {

            arrow_r.click();
        }, 2000);
    });

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');

    for (var i = 0; i < ul.children.length; i++) {

        var li = document.createElement('li');

        li.setAttribute('index', i);
        ol.appendChild(li);

        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    var num = 0;
    var circle = 0;

    arrow_r.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        circleChange();

    });


    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';

        }
        num--;
        animate(ul, -num * focusWidth);
        circle--;
        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();

    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function () {

        arrow_r.click();
    }, 2000);
})
function animate(obj, target) {
    clearInterval(obj.timer);//防抖
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}
var li = document.querySelectorAll('ul li a');
for (let index = 0; index < li.length; index++) {
    li[index].addEventListener('click', function () {
        for (let i = 0; i < li.length; i++) {
            li[i].style.borderBottom = 'none';

        }
        this.style.borderBottom = '3px solid #cccfd0';
    })

}
var lineChart = echarts.init(document.getElementById('line_graph'));
var xhr1 = new XMLHttpRequest()
xhr1.open('get', 'https://edu.telking.com/api/?type=month')
xhr1.onreadystatechange = function () {
    if (xhr1.readyState == 4 && xhr1.status == 200) {
        var result1 = JSON.parse(xhr1.responseText);
        var option = {
            title: {
                text: '曲线图数据展示',
                left: 'center'
            },
            xAxis: {
                data: result1.data.xAxis
            },
            yAxis: {},
            series: [
                {
                    data: result1.data.series,
                    type: 'line',
                    smooth: true,
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top'
                    }
                }
            ]
        }
        lineChart.setOption(option);
    }
}
xhr1.send()
var pieChart = echarts.init(document.getElementById('pie_chart'));
var xhr2 = new XMLHttpRequest()
xhr2.open('get', 'https://edu.telking.com/api/?type=week')
xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
        var result2 = JSON.parse(xhr2.responseText);
        var xAxis1 = result2.data.xAxis;
        var serise1 = result2.data.series;
        var data1 = serise1.map((value, i) => ({ value, name: xAxis1[i] }))
        var option = {
            title: {
                text: '饼状图数据展示',
                left: 'center'
            },
            series: [
                {
                    data: data1,
                    type: 'pie',
                    radius: '50%',
                    emphasis: {
                        focus: 'series'
                    },
                }
            ]
        }
        pieChart.setOption(option);
    }
}
xhr2.send()
var barChart = echarts.init(document.getElementById('bar_graph'));
var xhr3 = new XMLHttpRequest()
xhr3.open('get', 'https://edu.telking.com/api/?type=week')
xhr3.onreadystatechange = function () {
    if (xhr3.readyState == 4 && xhr3.status == 200) {
        var result3 = JSON.parse(xhr3.responseText);
        var option = {
            title: {
                text: '柱状图数据展示',
                left: 'center'
            },
            xAxis: {
                data: result3.data.xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: result3.data.series,
                    type: 'bar',

                }
            ]
        }
        barChart.setOption(option);
    }
}
xhr3.send()
    ;