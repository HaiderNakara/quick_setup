switch (stackName) {
  case "Mern":
    createMernProject(name+"_one");
  case "Mern + Typescript":
    createMernTypescript(name + "_two");
  case "React(Typescript) + Nestjs + MongoDb":
    createReactNestJsMongo(name + "_three");
   case "React":
    createReact(name + "_four");
      break;
    case "React(Typescript)":
      createRectTypescript(name + "_five");
      break;        
    case "Nestjs":
      createNestJs(name + "_six");
      break;
    case "Nestjs + MongoDb":
        createNestJsMonogo(name + "_seven");
        break;
    case "Express(Typescript)":
      createExpressTypescript(name + "_eight");
      break;
      case "Express":
        createExpress(name + "_nine");
          break;                         

}