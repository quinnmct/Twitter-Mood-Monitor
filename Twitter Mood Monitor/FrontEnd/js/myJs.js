//global js variables
			var map;  //google.maps.Map
			var cityCircle;
			
			//INIT TEMP DATA
			/////////////////////////////////////////////////////////
			
				var citymap = {};
				citymap[0] = {
				  name:"Boston",
				  center: new google.maps.LatLng(42.349156, -71.076050),
				  population: 3844829,
				  color: '#32CD32',
				  imgUrl: 'http://1.bp.blogspot.com/-b1w0NXIgYEI/TYrIva9fPjI/AAAAAAAAAAs/2QB9zgAO1HY/s45/boston_skyline.jpg',
				  tweet:"Hi from boston! Hi from boston! Hi from boston! Hi from boston! Hi from boston!"
				};
				citymap[1] = {
				  name:"Providence",
				  center: new google.maps.LatLng(41.803438, -71.402893),
				  population: 2844829,
				  color: '#FF8C00',
				  imgUrl: 'https://irs1.4sqi.net/img/general/50x50/904394_KutIbI1nccDoepdDWQ3qU9cQ1Ew2uABqBAsHleQy4qk.jpg',
				  tweet:"Hi from Providence! Hi from Providence! Hi from Providence! Hi from Providence!"
				};
				citymap[2] = {
				  name:"Worcester",
				  center: new google.maps.LatLng(42.272609, -71.814880),
				  population: 2144829,
				  color: '#FFD700',
				  imgUrl: 'http://www.provox-systems.com/documents/building.jpg',
				  tweet:"Hi from worcester! Hi from worcester! Hi from worcester! Hi from worcester!"
				};
			
			/////////////////////////////////////////////////////////
			$( "#alertMe" ).on( "click", function() {
			  alert('alerted');
			});
			$("#northeast").click(function(e){
				map.panTo(new google.maps.LatLng(41.093325, -74.882812));
				e.preventDefault();
			});
			
			$("#westCoast").click(function(e){
				map.panTo(new google.maps.LatLng(36.330062, -118.959961));
				e.preventDefault();
			});
			
			$("#south").click(function(e){
				map.panTo(new google.maps.LatLng(32.209896, -84.034424));
				e.preventDefault();
			});
			
			$("#texas").click(function(e){
				map.panTo(new google.maps.LatLng(31.837316, -98.822021));
				e.preventDefault();
			});
			
			$("#centralUS").click(function(e){
				map.panTo(new google.maps.LatLng(42.046743, -92.900391));
				e.preventDefault();
			});
			
			$("#northwest").click(function(e){
				map.panTo(new google.maps.LatLng(47.958203, -124.200439));
				e.preventDefault();
			});
			
			
			
			//code runs on page init
			function initialize() {
				//request response from DB
				
				//store city data in citymap object
				
				
				// create ComboBox using cities from DB
                /*$("#cityInput").kendoComboBox({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        
                        { text: "Miami", lat:25.658239, lng:-80.354004 },
                        { text: "San Francisco", lat: 37.713159, lng:-122.431641 },
                        { text: "Seattle", lat: 47.589031,lng: -122.321777 },
						{ text: "Boston", lat: 42.291025, lng: -71.301270 }
                    ],
                    filter: "contains",
                    suggest: true,
                    index: 3,
					select:onSelect
                });*/
				
				
				//init map options
				var mapOptions = {
					zoom: 6,
					center: new google.maps.LatLng(42.291025, -71.301270),
					mapTypeId: google.maps.MapTypeId.SATELLITE,
					zoomControl: false,
					scrollwheel:false,
					draggable: false, 
					disableDoubleClickZoom: true,
					disableDefaultUI: true
				}
				
				
				//create map with map div & map options
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				
				
					for (var city in citymap) {
						var populationOptions = {
						  strokeColor: citymap[city].color,
						  strokeOpacity: 0.8,
						  strokeWeight: 2,
						  fillColor: citymap[city].color,
						  fillOpacity: 0.25,
						  map: map,
						  center: citymap[city].center,
						  radius: citymap[city].population / 100,
						  clickable : true
						};
						
						// Add the circle for this city to the map.
						cityCircle = new google.maps.Circle(populationOptions);
						
						//atts click event to each circle
						google.maps.event.addListener(cityCircle, 'click', function(ev){
						
							$('#twitterBox').css({"visibility":"visible"});
							
							var closestDistance = 100000000;
							var closestCity;
							for(var city2 in citymap){
								var tempDistance = google.maps.geometry.spherical.computeDistanceBetween(
												   citymap[city2].center,ev.latLng);
								
								if(tempDistance < closestDistance){
									closestDistance = tempDistance;
									closestCity = city2;
									console.log(citymap[closestCity].name);
								}
							};
								
							$('#twitterName').text(citymap[closestCity].name + " - " + citymap[closestCity].tweet);
							//$('#twitterTweetText').text(citymap[closestCity].tweet);
							
							$('#twitterPic').attr("src",citymap[closestCity].imgUrl);
							
						});
					}
					
					
					//city select event
					/*function onSelect(e) {
							var dataItem = this.dataItem(e.item.index());
							map.panTo(new google.maps.LatLng(dataItem.lat, dataItem.lng));
					};*/
					
					//Close Popup twitter window
					document.getElementById('close').onclick = function(){
						$('#twitterBox').css({"visibility":"hidden"});
						return false;
					};
				}
			
			//add listener to init the map object
			google.maps.event.addDomListener(window, 'load', initialize);
			
			
			
			