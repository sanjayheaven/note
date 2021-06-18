const Koa = require('koa');
const app = new Koa();
const controller = { // 控制器
  index(ctx) {
    ctx.response.body = 'This is index page'
  },
  home(ctx) {
    ctx.response.body = 'This is home page'
  },
  _404(ctx) {
    ctx.response.body = '404 Not Found'
  }
}
const router = ctx => {
  // 如果需要区分请求的方法是get还是post, 那么就要继续加ctx.request.method 判断
  if( ctx.request.url === '/' ) {
    controller.index(ctx)
  } else if( ctx.request.url.startsWith('/home') ) {
    controller.home(ctx)
  } else {
    controller._404(ctx)
  }
};
app.use(router);
app.listen(8888,() => console.log("Server running at http://127.0.0.1:8888/"))