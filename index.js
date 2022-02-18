var degree = 1800;
var clicks = 0;

$(document).ready(function () {
  $('#spin').click(function () {
    clicks++;
    var newDegree = degree * clicks;
    var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    totalDegree = newDegree + extraDegree;

    $('#wheel .sec').each(function () {
      var t = $(this);
      var noY = 0;

      var c = 0;
      var n = 700;
      var interval = setInterval(function () {
        c++;
        if (c === n) {
          clearInterval(interval);
        }

        var aoY = t.offset().top;
        // $('#txt').html(aoY);

        if (aoY < 23.89) {
          $('#spin').addClass('spin');
          setTimeout(function () {
            $('#spin').removeClass('spin');
          }, 100);
        }
      }, 10);

      $('#inner-wheel').css({ transform: 'rotate(' + totalDegree + 'deg)' });

      noY = t.offset().top;
    });
  });
});

// DOM Element selections
const cardWrapper = document.querySelector('.cardWrapper');
const card = document.querySelector('.card');
const highlight = document.querySelector('.highlight');

// highest values for angle
const mostX = 10; // 10 or -10
const mostY = 10; // 10 or -10

cardWrapper.addEventListener('mousemove', (e) => {
  // remove transition
  card.style.transition = 'none';
  highlight.style.transition = 'none';

  const x = e.offsetX;
  const y = e.offsetY;
  const { width, height } = cardWrapper.getBoundingClientRect();
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  // calculate angle
  const rotationY = ((x - halfWidth) / halfWidth) * mostX;
  const rotationX = ((y - halfHeight) / halfHeight) * mostY;

  // set rotation
  card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
  highlight.style.left = `${(rotationY / mostX) * 30 * -1}%`;
  highlight.style.top = `${(rotationX / mostY) * 30 * -1}%`;
});

cardWrapper.addEventListener('mouseleave', () => {
  // add transition back
  card.style.transition = 'transform 0.5s ease-in-out';
  card.style.transform = `rotateY(0) rotateX(0)`;
  highlight.style.transition = 'left 0.5s ease-in-out, top 0.5s ease-in-out';

  // add default position back to highlight
  highlight.style.left = `-20%`;
  highlight.style.top = `-13%`;
});
