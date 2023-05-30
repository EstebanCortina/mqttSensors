let datos = [];
am5.ready(function () {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/radar-chart/
  var chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 160,
      endAngle: 380,
    })
  );

  // Create axis and its renderer
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
  var axisRenderer = am5radar.AxisRendererCircular.new(root, {
    innerRadius: 0,
  });

  axisRenderer.grid.template.setAll({
    stroke: root.interfaceColors.get("background"),
    visible: true,
    strokeOpacity: 0.8,
  });

  axisRenderer.ticks.template.disabled = true;

  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: 150,
      strictMinMax: true,
      renderer: axisRenderer,
    })
  );

  // Add clock hand
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
  var axisDataItem = xAxis.makeDataItem({});

  var clockHand = am5radar.ClockHand.new(root, {
    pinRadius: am5.percent(15),
    radius: am5.percent(75),
    bottomWidth: 27,
  });

  var bullet = axisDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: clockHand,
    })
  );

  xAxis.createAxisRange(axisDataItem);

  var label = chart.radarContainer.children.push(
    am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1em",
    })
  );

  axisDataItem.set("value", 0);
  bullet.get("sprite").on("rotation", function () {
    var value = axisDataItem.get("value");
    var text = Math.round(axisDataItem.get("value")).toString();
    xAxis.axisRanges.each(function (axisRange) {
      if (
        value >= axisRange.get("value") &&
        value <= axisRange.get("endValue")
      ) {
        fill = axisRange.get("axisFill").get("fill");
      }
    });

    label.set("text", Math.round(value).toString());

    clockHand.pin.animate({
      key: "fill",
      to: fill,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
    clockHand.hand.animate({
      key: "fill",
      to: fill,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
  });
  //La que si Sirve
  setInterval(function () {
    axisDataItem.animate({
      key: "value",
      to: datos[2].value / 10,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }, 100);

  chart.bulletsContainer.set("mask", undefined);

  // Create axis ranges bands
  // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
  var bandsData = [
    {
      title: "BAJO",
      color: "#96B94B",
      lowScore: 0,
      highScore: 50,
    },
    {
      title: "MEDIO",
      color: "#fdae19",
      lowScore: 50,
      highScore: 100,
    },
    {
      title: "ALTO",
      color: "#f04922",
      lowScore: 100,
      highScore: 150,
    },
  ];

  am5.array.each(bandsData, function (data) {
    var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

    axisRange.setAll({
      value: data.lowScore,
      endValue: data.highScore,
    });

    axisRange.get("axisFill").setAll({
      visible: true,
      fill: am5.color(data.color),
      fillOpacity: 0.8,
    });

    axisRange.get("label").setAll({
      text: data.title,
      inside: true,
      radius: 15,
      fontSize: "1em",
      fill: root.interfaceColors.get("background"),
    });
  });

  const socket = new WebSocket("wss://mqttsensors.onrender.com/api"); // Reemplaza la dirección con la URL del servidor WebSocket

  // Evento 'open' para manejar la conexión exitosa
  socket.addEventListener("open", () => {
    console.log("Conexión WebSocket establecida porfis");

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
    console.log("Conexión WebSocket cerrada PORFI");
  });

  // Make stuff animate on load
  chart.appear(1000, 100);
}); // end am5.ready()
