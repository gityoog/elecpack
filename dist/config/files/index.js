"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FilesConfig_1;
Object.defineProperty(exports, "__esModule", { value: true });
const anydi_1 = require("anydi");
const file_1 = __importDefault(require("../webpack/file"));
let FilesConfig = FilesConfig_1 = class FilesConfig {
    constructor() {
        this.files = [];
    }
    setOptions(options) {
        this.files = Object.entries(options).map(([name, options]) => {
            const fileOptions = Object.assign(Object.assign({}, options), { entry: { [FilesConfig_1.main]: options.entry } });
            const config = (0, anydi_1.DiFrom)(this).for(() => new file_1.default({ name, output: 'files/' + name }));
            config.setOptions(fileOptions);
            return {
                name,
                config
            };
        });
    }
    getOptions() {
        return this.files.map(({ name, config }) => ({ name, options: config.getOptions() }));
    }
};
FilesConfig.main = 'main';
FilesConfig = FilesConfig_1 = __decorate([
    (0, anydi_1.Service)()
], FilesConfig);
exports.default = FilesConfig;
