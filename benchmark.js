var siege = require('siege');
siege()
  .on(3000)
  .concurrent(10)
  .for(10000).times
  .get('/')
  .attack()