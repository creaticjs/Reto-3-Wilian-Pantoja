(function($) {
  $(function() {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    (function(n) {
      let r = [];
      for (let i = 1; i <= n; i++) {
        r.push('e' + i);
      }
      return r;
    })(17).map(id => {
      return $('#' + id + '-btn').click(function() {
        $('#' + id + '-div-img').toggleClass('scale-out');
        $('#' + id + '-div-img').css(
          'height',
          $('#' + id + '-div-img').hasClass('scale-out')
            ? $('#' + id + '-div-img').css('height', '0px')
            : $('#' + id + '-img').css('height')
        );
      });
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space

function elem(id) {
  return document.getElementById(id);
}

function v(id) {
  return document.getElementById(id).value;
}

function vn(id) {
  let element = document.getElementById(id);
  if (element) {
    if (element.value !== null && element.value !== '') {
      return Number.parseFloat(element.value);
    }
  }
  return Number.NaN;
}

function setValue(id, value) {
  let element = document.getElementById(id);
  if (element) {
    element.innerHTML = value;
  }
}

let ejercicios = {
  calcularSalario: calcularSalario,
  calcularPI: calcularPI,
  generarInputs: generarInputs,
  calcularPascua: calcularPascua,
  calcularBisiesto: calcularBisiesto,
  calcularCuadradoMagico: calcularCuadradoMagico,
  numeroPerfecto: numeroPerfecto,
  calcularE: calcularE,
  calcularMeses: calcularMeses,
  calcularMCD: calcularMCD,
  calcularPrimo: calcularPrimo,
  calcularSerie: calcularSerie,
  calcularSerie13: calcularSerie13,
  visualizarAsteriscos: visualizarAsteriscos,
  numeroPerfecto15: numeroPerfecto15,
  numeroNatural: numeroNatural,
  generarInputs17: generarInputs17
};

/**
 * Ejercicio 1
 */
function calcularSalario() {
  let salario = vn('e1_salario');
  let resultado = salario;

  if (salario >= 0) {
    if (salario <= 9000) {
      resultado *= 1.2;
    } else if (salario <= 15000) {
      resultado *= 1.1;
    } else if (salario <= 20000) {
      resultado *= 1.05;
    }
    setValue('e1_resultado', resultado);
  } else {
    setValue('e1_resultado', 'Ingrese un valor positivo para salario');
    return;
  }
}

/**
 * Ejercicio 2
 */
function calcularPI() {
  let n = vn('e2_n');
  if (n >= 1 && Number.isInteger(n)) {
    let pi2 = 1;
    for (let i = 1; i <= n; i++) {
      pi2 *= ((2 * i) / (2 * i - 1)) * ((2 * i) / (2 * i + 1));
    }
    setValue('e2_resultado', pi2 * 2);
  } else {
    setValue('e2_resultado', 'El valor no puede ser calculado.');
  }
}

/**
 * Ejercicio 3
 */
function generarInputs() {
  let n = vn('e3_n');
  let contenedor = elem('e3_contenedor');
  contenedor.innerHTML = '';

  if (Number.isInteger(n) && n >= 1) {
    for (let i = 1; i <= n; i++) {
      let newInput = $(`
        <div class="input-field col s12">
          <input id="e3_input_${i}" type="number" class="validate" oninput="calcularValores(3, ${n})">
          <label for="e3_input_${i}">Digite <em>valor</em></label>
        </div>
      `);
      $(contenedor).append(newInput);
    }
  } else {
    setValue('e3_pequenio', 'Digite un valor valido.');
    setValue('e3_grande', 'Digite un valor valido.');
    setValue('e3_media', 'Digite un valor valido.');
  }
}

function calcularValores(id, n) {
  let inputs = [];
  for (let i = 1; i <= n; i++) {
    let numero = vn('e' + id + '_input_' + i);
    if (!Number.isNaN(numero)) {
      inputs.push(numero);
    }
  }
  setValue('e' + id + '_pequenio', Math.max(...inputs));
  setValue('e' + id + '_grande', Math.min(...inputs));
  setValue(
    'e' + id + '_media',
    inputs.reduce((prev, next) => prev + next) / inputs.length
  );
}

/**
 * Ejercicio 4
 */
function calcularPascua() {
  let annio = vn('e4_annio');
  if (!Number.isNaN(annio)) {
    let p = pascua(annio);
    console.log(p);

    setValue('e4_resultado', p.getDate() + ' de ' + mes(p.getMonth()));
  } else {
    setValue('e4_resultado', 'No es posible hacer el cálculo.');
  }
}

function pascua(annio) {
  let a, b, c, d, e, f, dia, mes, pascua, M, N;
  M = 24;
  N = 5;
  a = annio % 19;
  b = annio % 4;
  c = annio % 7;
  d = (19 * a + M) % 30;
  e = (2 * b + 4 * c + 6 * d + N) % 7;
  f = d + e;
  if (f < 10) {
    dia = f + 22;
    mes = 2;
  } else {
    dia = f - 9;
    mes = 3;
  }
  if (dia == 26 && mes == 4) {
    dia = 19;
  }
  if (dia == 25 && mes == 4 && d == 28 && e == 6 && a > 10) {
    dia = 18;
  }
  pascua = new Date(annio, mes, dia);
  return pascua;
}

let meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

function mes(id) {
  return meses[id];
}

/**
 * Ejercicio 5
 */
function calcularBisiesto() {
  let fecha = vn('e5_fecha');
  if (!Number.isInteger(fecha)) {
    return;
  }
  let anio = fecha;

  if ((anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0) {
    setValue('e5_resultado', 'Año bisiesto');
  } else {
    setValue('e5_resultado', 'No es bisiesto');
  }
}

/**
 * Ejercicio 6
 */
function calcularCuadradoMagico() {
  setValue('e6_resultado', 'Aun no se ha impleentado este ejercicio');
}

/**
 * Ejercicio 7
 */
function numeroPerfecto() {
  let numeros = [];
  let i = 1;
  while (numeros.length < 3) {
    //while (i < 200) {
    if (esNumeroPerfecto(i)) {
      numeros.push(i);
    }
    i++;
  }
  setValue(
    'e7_resultado',
    numeros.reduce((prev, next) => {
      return prev + ', ' + next;
    })
  );
}

function esNumeroPerfecto(i) {
  let div = divisores(i);
  if (
    div.length > 1 &&
    i ==
      div.reduce((p, n) => {
        return p + n;
      })
  ) {
    return true;
  }
  return false;
}

function divisores(n1) {
  var i;
  var div = [];
  for (i = 1; i < n1; i++) {
    if (n1 % i === 0) {
      div.push(i);
    }
  }
  return div;
}

/**
 * Ejercicio 8
 */
function calcularE() {
  let x = vn('e8_x');
  let ex = 1;
  for (let i = 1; i <= 100; i++) {
    ex += Math.pow(x, i) / factorial(i);
  }
  setValue('e8_resultado', ex);
}

function factorial(n) {
  var total = 1;
  for (var i = 1; i <= n; i++) {
    total = total * i;
  }
  return total;
}

/**
 * Ejercicio 9
 */
function calcularMeses() {
  var serie = [1, 1];
  // inicio de semana
  var week = 2;
  // numero de semanas
  var amount = vn('e9_n');
  var i = 1;
  while (serie[serie.length - 1] <= amount) {
    serie[i + 1] = serie[i] + serie[i - 1];
    week++;
    i++;
  }
  setValue('e9_resultado', week);
}

/**
 * Ejercicio 10
 */
function calcularMCD() {
  let w, mcd;
  let x = vn('e10_a');
  let y = vn('e10_b');

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return;
  }

  while (y != 0) {
    w = x % y;
    x = y;
    y = w;
  }
  mcd = x;
  setValue('e10_resultado', mcd);
}

/**
 * Ejercicio 11
 */
function calcularPrimo() {
  let numero = vn('e11_n');

  if (Number.isNaN(numero) || numero < 0) {
    setValue('e11_resultado', 'El valor ingresado no es un numero valido.');
    return;
  }

  for (var i = 2; i < numero; i++) {
    if (numero % i === 0) {
      setValue('e11_resultado', 'El numero no es primo');
      return;
    }
  }

  if (numero === 1) {
    setValue('e11_resultado', 'El numero  no es primo');
  } else {
    setValue('e11_resultado', 'El numero es primo');
  }
}

/**
 * Ejercicio 12
 */
function calcularSerie() {
  let n = vn('e12_n');
  if (Number.isNaN(n) || n <= 0) {
    setValue('e12_resultado', 'El valor ingresado no es valido.');
    return;
  }

  let suma = 0;
  for (let i = 1; i <= n; i++) {
    suma += 1 / i;
  }

  setValue('e12_resultado', suma);
}

/**
 * Ejercicio 13
 */
function calcularSerie13() {
  let n = vn('e13_n');
  if (Number.isNaN(n) || n <= 0) {
    setValue('e13_resultado', 'El valor ingresado no es valido.');
    return;
  }

  let suma = 0;
  for (let i = 1; i <= n; i++) {
    suma += i / Math.pow(2, i);
  }

  setValue('e13_resultado', suma);
}

/**
 * Ejercicio 14
 */
function visualizarAsteriscos() {
  let n = vn('e14_n');
  if (Number.isNaN(n) || n <= 0) {
    setValue('e13_resultado', 'El valor ingresado no es valido.');
    return;
  }

  let linea = '';
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      linea += '*';
    }
    linea += '<br>';
  }
  console.log(linea);

  setValue('e14_resultado', linea);
  document.getElementById('e14_resultado').innerHTML = linea;
}

/**
 * Ejercicio 15
 */
function numeroPerfecto15() {
  let numeros = [];
  let i = 1;
  let n = vn('e15_n');

  if (Number.isNaN(n) || n >= 5) {
    setValue(
      'e15_resultado',
      'El valor ingresado no es valido, o no es posible calcular el número.'
    );
    return;
  }

  while (numeros.length < n) {
    if (esNumeroPerfecto(i)) {
      numeros.push(i);
    }
    i++;
  }
  setValue(
    'e15_resultado',
    numeros.reduce((prev, next) => {
      return prev + ', ' + next;
    })
  );
}

/**
 * Ejercicio 16
 */
function numeroNatural() {
  let n = vn('e16_n');
  if (Number.isNaN(n) || n <= 0) {
    setValue('e16_resultado', 'El valor ingresado no es valido.');
    return;
  }

  let suma = 0;
  for (let i = 1; i <= n; i++) {
    suma = calcularSuma(i);
    if (suma >= n) {
      setValue('e16_resultado', 'N es ' + i);
      return;
    }
  }
  setValue('e16_resultado', 'El valor no pudo ser calculado');
}

function calcularSuma(n) {
  let suma = 0;
  for (let i = 1; i <= n; i++) {
    suma += i;
  }
  return suma;
}

/**
 * Ejercicio 17
 */
function generarInputs17() {
  let n = vn('e17_n');
  let contenedor = elem('e17_contenedor');
  contenedor.innerHTML = '';

  if (Number.isInteger(n) && n >= 1) {
    for (let i = 1; i <= n; i++) {
      let newInput = $(`
        <div class="input-field col s12">
          <input id="e17_input_${i}" type="number" class="validate" oninput="calcularValores(17, ${n})">
          <label for="e17_input_${i}">Digite <em>valor</em></label>
        </div>
      `);
      $(contenedor).append(newInput);
    }
  } else {
    setValue('e17_pequenio', 'Digite un valor valido.');
    setValue('e17_grande', 'Digite un valor valido.');
    setValue('e17_media', 'Digite un valor valido.');
  }
}
