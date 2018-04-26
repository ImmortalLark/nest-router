import test from 'ava';
import NestRouter from '../index';
import { Controller, Module } from "@nestjs/common";
import { PATH_METADATA, MODULE_PATH } from '@nestjs/common/constants';

@Controller("artical")
class ArticalController {}

@Controller("admin")
class AdminController {}

@Module({ controllers: [AdminController] })
class AdminModule {}

@Module({ controllers: [ArticalController] })
class ArticalModule {}

test('nestController', t => {
  const routes = NestRouter.nestController("root", {
    AdminController,
    nest: {
      ArticalController
    }
  })
  t.is(Reflect.getMetadata(PATH_METADATA, routes[0]), "root/admin");
  t.is(Reflect.getMetadata(PATH_METADATA, routes[1]), "root/nest/artical");
})

test('nestModule', t => {
  const routes = NestRouter.nestModule("root", {
    AdminModule,
    nest: {
      ArticalModule
    }
  })
  t.is(Reflect.getMetadata(MODULE_PATH, routes[0]), "root");
  t.is(Reflect.getMetadata(MODULE_PATH, routes[1]), "root/nest");
})