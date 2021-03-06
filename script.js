var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var imageData;
max_size = 128;
document.getElementById('myFile').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = () => showImage(fr);
        fr.readAsDataURL(files[0]);
    }
}

function showImage(fileReader) {
    max_size = document.getElementById('max_size').value;
    var img = document.getElementById("myImage");
    img.onload = () => getImageData(img);
    img.src = fileReader.result;
}

function getImageData(img) {
  document.getElementById('image_data').innerHTML = "";
  scale = 1;
  if(img.width>max_size){
    scale = max_size/img.width;
  }
  console.log(scale);
  // return 0;
    ctx.scale(scale,scale)
    ctx.drawImage(img, 0, 0);
    window.imageData = ctx.getImageData(0, 0, img.width*scale, img.height*scale);
    data = imageData.data;
    console.log(data.length)
    // table_data = "";
    table_data = "<TABLE>";
    //red color
    ir=0;
    ig=1;
    ib=2;
    i=0;

    while(i<data.length){

    i=ir;
    table_data += "<tr>";
    for(i1=0;i1<imageData.width;i1++){
      color="rgb("+data[i]+",0,0)";
      table_data += "<td style='background-color:"+color+";'>"+data[i]+"</td>";
      i+=4;
      ir=i;
    }
    table_data += "</tr>";

    i=ig;
    table_data += "<tr>";
    for(i1=0;i1<imageData.width;i1++){
      color="rgb(0,"+data[i]+",0)";
      table_data += "<td style='background-color:"+color+";'>"+data[i]+"</td>";
      i+=4;
      ig=i;
    }
    table_data += "</tr>";

    i=ib;
    table_data += "<tr>";
    for(i1=0;i1<imageData.width;i1++){
      color="rgb(0,0,"+data[i]+")";
      table_data += "<td style='background-color:"+color+";'>"+data[i]+"</td>";
      i+=4;
      ib=i;
    }
    table_data += "</tr>";

  }
  table_data += "</TABLE>"

// document.getElementById('table').innerHTML = table_data;
document.getElementById('clipb').value = table_data;
copytoc(table_data);
alert('Done : Data copied to clipboard');
// setTimeout(reload,500);
}

function reload(){ location.reload();}


function copytoc(str){
  var ctb = document.getElementById("clipb");
  ctb.value = str;
  ctb.select();
  document.execCommand("copy");
}


function toggle(){

}
