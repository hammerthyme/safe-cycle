const app = require("./server");

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function() {
  console.log(`Server attentively listening on port ${port}`);
});
