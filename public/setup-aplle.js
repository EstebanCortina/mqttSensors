let change = 1;

am5.ready(function () {
  let datos = [];
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("apllediv");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  // Create the map chart
  // https://www.amcharts.com/docs/v5/charts/map-chart/
  var chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "rotateY",
      projection: am5map.geoOrthographic(),
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    })
  );

  // Create main polygon series for countries
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
  var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
    })
  );

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}",
    toggleKey: "active",
    interactive: true,
  });

  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: root.interfaceColors.get("primaryButtonHover"),
  });

  // Create series for background fill
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
  var backgroundSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {})
  );
  backgroundSeries.mapPolygons.template.setAll({
    fill: root.interfaceColors.get("alternativeBackground"),
    fillOpacity: 0.1,
    strokeOpacity: 0,
  });
  backgroundSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180),
  });

  // Create graticule series
  // https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
  var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
  graticuleSeries.mapLines.template.setAll({
    strokeOpacity: 0.1,
    stroke: root.interfaceColors.get("alternativeBackground"),
  });

  var backgroundSeries = chart.series.unshift(
    am5map.MapPolygonSeries.new(root, {})
  );

  backgroundSeries.mapPolygons.template.setAll({
    fill: am5.color(0xd4f1f9),
    stroke: am5.color(0xd4f1f9),
  });

  backgroundSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180),
  });

  //Acá dentro de los If´s va el codigo para encender y apagar el foco 💡
  document.getElementById("mundos").addEventListener("click", () => {
    if (change) {
      backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(0x003566),
        stroke: am5.color(0x003566),
      });
      change = 0;
      socketd.send(JSON.stringify({ type: 1 }));
      console.log("He apagao"); //MANDAR AQUÍ LA SEÑAL PARA APAGAR EL FOCO IoT
    } else {
      backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(0xd4f1f9),
        stroke: am5.color(0xd4f1f9),
      });
      change = 1;
      console.log("He prendio"); //MANDAR AQUÍ LA SEÑAL PARA PRENDER EL FOCO IoT
      socketd.send(JSON.stringify({ type: 1 }));
    }
  });
  // Rotate animation
  chart.animate({
    key: "rotationX",
    from: 0,
    to: 360,
    duration: 30000,
    loops: Infinity,
  });
  const socketd = new WebSocket("wss://mqttsensors.onrender.com/api");
  socketd.addEventListener("open", () => {
    console.log("Conexión WebSocket establecida APLLE");

    // Puedes enviar un mensaje al servidor si es necesario
    // socket.send('Mensaje de prueba');
  });

  // Evento 'message' para manejar los mensajes recibidos del servidor
  socketd.addEventListener("message", (event) => {
    datos = JSON.parse(event.data);
    console.log(datos);

    // Procesar los datos recibidos como sea necesario
  });

  // Evento 'close' para manejar la desconexión del servidor
  socketd.addEventListener("close", () => {
    console.log("Conexión WebSocket cerrada APLLE");
  });
  // Make stuff animate on load
  chart.appear(1000, 100);
}); // end am5.ready()
