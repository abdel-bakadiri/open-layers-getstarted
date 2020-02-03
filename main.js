(function () {

	var timer;
	var msRemaining = 60000;
	var timerDiv;

	document.addEventListener('DOMContentLoaded', init);
	// DOMContenteLoaded if the dom is ready

	function init() {
		setupMap();
		initializeStartButton();
		initializeTimer();
	}

	function setupMap() {
		var coordsHacker = [-0.0761, 51.5081];
		// 1- create a localisation of hacker
		var localisationHacker = new ol.proj.transform(coordsHacker, 'EPSG:4326', 'EPSG:3857');
		// 2- create a feature for a vetor layer
		var hackerFeature = new ol.Feature(
			{
				geometry: new ol.geom.Point(localisationHacker)
			}
		);
		var hackerStyle = new ol.style.Style({
			image: new ol.style.Icon({
				src: 'marker.png'
			})
		});
		hackerFeature.setStyle(hackerStyle);
		var vectorSource = new ol.source.Vector({
			features: [hackerFeature]
		});
		hackerLayer = new ol.layer.Vector({
			source: vectorSource,
			maxResolution: 200
		});
		var streetmapLayer = new ol.layer.Tile({
			source: new ol.source.OSM()
		});

		var myView = new ol.View({
			center: ol.proj.transform([-95, 42], 'EPSG:4326', 'EPSG:3857'),
			zoom: 1
		});

		var map = new ol.Map({
			target: 'map',
			layers: [streetmapLayer, hackerLayer],
			view: myView,
			controls: ol.control.defaults().extend([
				new ol.control.OverviewMap({})]
			)
		});

		map.on('click', (evt) => map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
			if (feature) {
				catchHacker();
			}
		}
		))

	}

	function initializeTimer() {
		timerDiv = document.getElementById('timer');
	}

	function initializeStartButton() {
		var startDiv = document.getElementById("start");
		startDiv.addEventListener("click", function () {
			quiz.style.display = "block";
			startDiv.style.display = "none";
			startTimer();
		});
	}

	function startTimer() {
		timer = setInterval(function () {
			msRemaining -= 100;
			timerDiv.innerHTML = parseFloat(msRemaining / 1000).toFixed(1);
			if (msRemaining == 0) {
				alert("The Hacker has escaped!");
				clearInterval(timer);
			}
		}, 100);
	}

	function catchHacker() {
		clearInterval(timer);
		alert("You caught The Hacker!");
	}

})();