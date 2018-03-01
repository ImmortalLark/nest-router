import { Controller } from "@nestjs/common";
import { PATH_METADATA } from '@nestjs/common/constants';

export default function (path, ...TargetClass) {
  return TargetClass.map((Target, index) => {
    let newPath
    let oldPath = Reflect.getMetadata(PATH_METADATA, Target);

    if(oldPath) {
      newPath = `${path}/${oldPath}`
    }
    
    @Controller(newPath)
    class NestController extends Target {}

    let controller = NestController;
    Reflect.defineProperty(NestController, "name", { value: `NestController${index}`, writable: true });

    return controller;
  })
}