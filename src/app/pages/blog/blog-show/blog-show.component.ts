import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output, EventEmitter
} from '@angular/core';

declare var editormd: any;
@Component({
  selector: 'app-blog-show',
  templateUrl: './blog-show.component.html',
  styleUrls: ['./blog-show.component.less']
})
export class BlogShowComponent implements OnInit {
  @Input() markdown;
  @Output() result = new EventEmitter();
  constructor(
    private cdef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.markdownToHtml();
  }

  markdownToHtml() {
    editormd.markdownToHTML("test-editormd-view2", {
      markdown        : this.markdown['content'] ,//+ "\r\n" + $("#append-test").text(),
      //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
      htmlDecode      : "style,script,iframe",  // you can filter tags decode
      //toc             : false,
      tocm            : true,    // Using [TOCM]
      tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
      //gfm             : false,
      //tocDropdown     : true,
      // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
      emoji           : true,
      taskList        : true,
      tex             : true,  // 默认不解析
    });
  }

  back(){
    this.result.emit(true);
  }
}
