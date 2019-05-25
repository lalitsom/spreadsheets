var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var imageData;
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
    var img = document.getElementById("myImage");
    img.onload = () => getImageData(img);
    img.src = fileReader.result;
}

function getImageData(img) {
  document.getElementById('image_data').innerHTML = "";
    ctx.drawImage(img, 0, 0);
    window.imageData = ctx.getImageData(0, 0, img.width, img.height);
    data = imageData.data;

    table_data = "";
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


document.getElementById('table').innerHTML = table_data;
copytoc(document.getElementById('table_contain').innerHTML)
alert('done');
}




function copytoc(str){
  var ctb = document.getElementById("clipb");
  ctb.value = str;
  ctb.setAttribute('readonly', '');
  ctb.select();
  document.execCommand("copy");
}
