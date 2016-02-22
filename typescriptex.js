var fileLoader = (function () {
    function fileLoader(fileObject) {
        this.reader = new FileReader();
        this.setUpHandlers();
        this.reader.readAsDataURL(fileObject);
    }
    fileLoader.prototype.setUpHandlers = function () {
        var _this = this;
        this.reader.addEventListener('load', function (event) {
            _this.handleLoad(event);
        });
    };
    fileLoader.prototype.handleLoad = function (event) {
        // Get our file as a base 64 data uri
        var url = event.target.result;
        // Get a ref to the actual image
        var theImage = document.getElementById('theImage');
        // And change it's source to the base 64 url we got by reading the file.
        theImage.src = url;
    };
    return fileLoader;
})();
var DragAndDrop = (function () {
    function DragAndDrop() {
        this.dropTarget = document.getElementById('dropTarget');
        this.addEventHandlers();
    }
    DragAndDrop.prototype.addEventHandlers = function () {
        var _this = this;
        this.dropTarget.addEventListener('dragenter', function (event) {
            _this.handleDragEnter(event);
        });
        this.dropTarget.addEventListener('dragover', function (event) {
            _this.handleDragOver(event);
        });
        this.dropTarget.addEventListener('dragleave', function (event) {
            _this.handleDragLeave(event);
        });
        this.dropTarget.addEventListener('drop', function (event) {
            _this.handleDrop(event);
        });
    };
    DragAndDrop.prototype.handleDragEnter = function (event) {
        console.log("Drag Enter Occured");
        this.dropTarget.classList.add("active");
        event.preventDefault();
    };
    DragAndDrop.prototype.handleDragOver = function (event) {
        console.log("Drag Over");
        // Must return false otherwise browser WILL NOT allow drop on target
        event.preventDefault();
        return false;
    };
    DragAndDrop.prototype.handleDragLeave = function (event) {
        console.log("Drag Leave");
        this.dropTarget.classList.remove("active");
        event.preventDefault();
    };
    DragAndDrop.prototype.handleDrop = function (event) {
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
        }
        catch (e) {
            // Browsers that don't support drag & drop native will end up here, and you'll have a URL (I think :-) )
            dataValue = event.dataTransfer.getData('URL');
            dataType = 'URL';
        }
        if (dataType == 'URL') {
        }
        else {
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
    };
    return DragAndDrop;
})();
var myDragAndDrop = new DragAndDrop();
