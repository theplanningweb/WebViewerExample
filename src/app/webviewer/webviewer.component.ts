import { Component, ViewChild, OnInit, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFile } from '../dto/IFile';

declare const WebViewer: any;

@Component({
  selector: 'web-viewer',
  templateUrl: './webviewer.component.html',
  styleUrls: ['./webviewer.component.css']
})
export class WebViewerComponent implements OnInit, AfterViewInit, OnChanges {

  // Syntax if using Angular 8+
  // true or false depending on code
  @ViewChild('viewer', {static: false}) viewer: ElementRef;
  @Input() inpFile: IFile; 
  path: string = '';
  extension: string = "";

  wvInstance: any;

  ngOnInit() {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
/*     const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.wvInstance;
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotManager.getCurrentUser();
    annotManager.addAnnotation(rectangle);
    annotManager.drawAnnotations(rectangle.PageNumber); */
    // see https://www.pdftron.com/api/web/WebViewerInstance.html for the full list of low-level APIs
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['inpFile']) {
        if(this.inpFile){
          this.path = this.inpFile.path;
        this.extension = this.inpFile.extension;
          if(this.wvInstance){
            if(this.extension === 'PDF'){
             
            }
            this.wvInstance.loadDocument(this.path, {extension: this.extension});
          }
        }
        
    }
  }

  ngAfterViewInit(): void {

    // The following code initiates a new instance of WebViewer.

    WebViewer({
      path: '../../wv-resources/lib',
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      // now you can access APIs through this.webviewer.getInstance()
      //instance.openElement('notesPanel');
      // see https://www.pdftron.com/documentation/web/guides/ui/apis 
      // for the full list of APIs

      // or listen to events from the viewer element
      this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
        const [ pageNumber ] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
     /*  instance.docViewer.on('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler) */
      instance.loadDocument(this.path, { extension: this.extension});
    })
  }
}