class fileLoader {

  constructor(fileObject: any) {
    this.reader = new FileReader();
    this.setUpHandlers();
    this.reader.readAsDataURL(fileObject);
  }

  public reader: FileReader

  private setUpHandlers() {

    this.reader.addEventListener('load', (event) => {
      this.handleLoad(event);
    });

  }

  public handleLoad(event: any) { // TODO: Find out the proper event type in typescript for this

    // Get our file as a base 64 data uri
    var url = event.target.result;

    // Get a ref to the actual image
    var theImage: HTMLImageElement = <HTMLImageElement>document.getElementById('theImage');
             
    // And change it's source to the base 64 url we got by reading the file.
    theImage.src = url;

  }

}

class DragAndDrop {

  constructor() {
    this.dropTarget = <HTMLDivElement>document.getElementById('dropTarget');

    this.addEventHandlers();
  }

  public dropTarget: HTMLDivElement;

  public addEventHandlers() {

    this.dropTarget.addEventListener('dragenter', (event: DragEvent) => {
      this.handleDragEnter(event);
    })

    this.dropTarget.addEventListener('dragover', (event: DragEvent) => {
      this.handleDragOver(event);
    })

    this.dropTarget.addEventListener('dragleave', (event: DragEvent) => {
      this.handleDragLeave(event);
    })

    this.dropTarget.addEventListener('drop', (event: DragEvent) => {
      this.handleDrop(event);
    })

  }

  public handleDragEnter(event: DragEvent) {
    console.log("Drag Enter Occured");

    this.dropTarget.classList.add("active");
    event.preventDefault();
  }

  public handleDragOver(event: DragEvent) {
    console.log("Drag Over");
      
    // Must return false otherwise browser WILL NOT allow drop on target
    event.preventDefault();
    return false;
  }

  public handleDragLeave(event: DragEvent) {
    console.log("Drag Leave");

    this.dropTarget.classList.remove("active");
    event.preventDefault();
  }

  public handleDrop(event: DragEvent) {
    console.log("Drop");

    event.stopPropagation();
    event.preventDefault();

    this.dropTarget.classList.remove("active");

    var dataType;
    var dataValue;
      
    //get the URL of elements being dragged here
    try {
      dataValue = event.dataTransfer.getData('text/uri-list');
      dataType = 'text/uri-list';
    } catch (e) {
      // Browsers that don't support drag & drop native will end up here, and you'll have a URL (I think :-) )
      dataValue = event.dataTransfer.getData('URL');
      dataType = 'URL';
    }

    if (dataType == 'URL') {
      // Handle the older stuff here
    } else {
        
      // Other browsers here that is IE10+, and FF & Chrome
         
      var dataFiles = event.dataTransfer.files;

      if (dataFiles.length > 1) {
        alert("Please drag only one file at a time");
        return;
      }

      if (!dataFiles[0].type.match('image.*')) {
        alert("Please only drag image files onto the drop target");
        return;
      }

      var myLoader = new fileLoader(dataFiles[0]);

    }

  }

}

var myDragAndDrop = new DragAndDrop();
