am5.ready(() => {
  let datos = [];
  const socket = new WebSocket("wss://mqttsensors.onrender.com/api"); // Reemplaza la dirección con la URL del servidor WebSocket

  // Evento 'open' para manejar la conexión exitosa
  socket.addEventListener("open", () => {
    console.log("Conexión WebSocket establecida SAMU");

    // Puedes enviar un mensaje al servidor si es necesario
    // socket.send('Mensaje de prueba');
  });

  // Evento 'message' para manejar los mensajes recibidos del servidor
  socket.addEventListener("message", (event) => {
    datos = JSON.parse(event.data);
    // Procesar los datos recibidos como sea necesario
  });

  // Evento 'close' para manejar la desconexión del servidor
  socket.addEventListener("close", () => {
    console.log("Conexión WebSocket cerrada SAMU");
  });
  //Una vez que la biblioteca amCharts esté lista, el código se ejecutará.

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("samudiv");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  /* AQUÍ SE INSERTA LA INFORMACIÓN DE LOS SENSORES (QUITAR RANDOM DATA) */
  // Generate data
  //PRIMER VERSION
  let value = 0;

  function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 1000);
    firstDate.setHours(0, 0, 0, 0);

    for (var i = 0; i < 50; i++) {
      var newDate = new Date(firstDate);
      newDate.setSeconds(newDate.getSeconds() + i);

      value += 1;

      chartData.push({
        date: newDate.getTime(),
        value: value, //Info del JSON
      });
    }
    return chartData;
  }

  var data = generateChartData();
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      focusable: true,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
    })
  );

  var easing = am5.ease.linear;

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0.5,
      groupData: false,
      extraMax: 0.05, // this adds some space in front
      extraMin: -0.6, // this removes some space form the beginning so that the line would not be cut off
      baseInterval: {
        timeUnit: "second",
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 100,
      }),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}",
      }),
    })
  );

  // tell that the last data item must create bullet
  data[data.length - 1].bullet = true;
  series.data.setAll(data);

  // Create animating bullet by adding two circles in a bullet container and
  // animating radius and opacity of one of them.
  series.bullets.push((root, series, dataItem) => {
    // only create sprite if bullet == true in data context
    if (dataItem.dataContext.bullet) {
      var container = am5.Container.new(root, {});
      var circle0 = container.children.push(
        am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000),
        })
      );
      var circle1 = container.children.push(
        am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000),
        })
      );

      circle1.animate({
        key: "radius",
        to: 60,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });
      circle1.animate({
        key: "opacity",
        to: 0,
        from: 1,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      return am5.Bullet.new(root, {
        locationX: undefined,
        sprite: container,
      });
    }
  });

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      xAxis: xAxis,
    })
  );
  cursor.lineY.set("visible", false);

  // Update data every second
  // Función para actualizar el gráfico con los nuevos datos
  function updateChart() {
    // Limpiar los datos existentes del gráfico
    series.data.clear();

    // Agregar los nuevos datos del JSON al gráfico
    for (var i = 0; i < datos.length; i++) {
      var dataItem = datos[i];
      series.data.push({
        date: dataItem.date,
        value: dataItem.value,
      });
    }

    // Actualizar la apariencia del gráfico
    chart.appear(1000, 100);
  }

  //oaskdoaksdpakpsdkapskdpaskdpaskdpakspdaksdapskdpaskdpakspdkaspdkaps
  setInterval(() => {
    addData();
  }, 1000);

  let variable = [0, 10, 5678, 1, 10];
  function addData() {
    var lastDataItem = series.dataItems[series.dataItems.length - 1];

    var lastValue = lastDataItem.get("valueY");
    var newValue = value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5;
    var lastDate = new Date(lastDataItem.get("valueX"));
    var time = am5.time.add(new Date(lastDate), "second", 1).getTime();
    series.data.removeIndex(0);
    series.data.push({
      date: time,
      value: datos[0].value,
    });

    var newDataItem = series.dataItems[series.dataItems.length - 1];
    newDataItem.animate({
      key: "valueYWorking",
      to: datos[0].value,
      from: lastValue,
      duration: 600,
      easing: easing,
    });

    // use the bullet of last data item so that a new sprite is not created
    newDataItem.bullets = [];
    newDataItem.bullets[0] = lastDataItem.bullets[0];
    newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
    // reset bullets
    lastDataItem.dataContext.bullet = false;
    lastDataItem.bullets = [];

    var animation = newDataItem.animate({
      key: "locationX",
      to: 0.5,
      from: -0.5,
      duration: 600,
    });
    if (animation) {
      var tooltip = xAxis.get("tooltip");
      if (tooltip && !tooltip.isHidden()) {
        animation.events.on("stopped", function () {
          xAxis.updateTooltip();
        });
      }
    }
  }
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/*/

  chart.appear(1000, 100);
}); // Here ends am5.ready();
