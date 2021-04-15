module.exports = {
  presets: [
    // react 语法转译
    '@babel/preset-react',  
    // 按需加载插件
    ['@babel/preset-env', {   
      modules: false,
    }],
    // 配置解析typescript
    "@babel/typescript"  
  ],
  plugins: [
    '@babel/plugin-transform-runtime',  // 自动替换辅助函数
    "@babel/proposal-class-properties",  // 编译类
    "@babel/proposal-object-rest-spread", // 帮助生成符合规范的代码
    '@babel/plugin-transform-typescript', // 对TypeScript编程语言使用的语法的支持
    '@babel/plugin-syntax-dynamic-import', // 用以解析识别import()动态导入语法---并非转换
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持类的装饰器语法, 包括类装饰器, 属性装饰器, 方法装饰器
  ],
};