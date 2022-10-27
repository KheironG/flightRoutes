"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc = __importStar(require("@trpc/server"));
const zod_1 = __importDefault(require("zod"));
const csv_parse_1 = require("csv-parse");
const fs = __importStar(require("fs"));
// let cats: Cat[] = [
//     { id: 12, name: 'test' },
//     { id: 13, name: 'testing' }
// ];
//
// const Cat = z.object({
//     id: z.number(),
//     name: z.string()
// })
// const Cats = z.array(Cat);
let airports = [];
const Airport = zod_1.default.object({
    id: zod_1.default.number(),
    ident: zod_1.default.string(),
    type: zod_1.default.string(),
    name: zod_1.default.string(),
    latitude_deg: zod_1.default.string().or(zod_1.default.number()),
    longitude_deg: zod_1.default.string().or(zod_1.default.number()),
    elevation_ft: zod_1.default.string().or(zod_1.default.number()),
    continent: zod_1.default.string(),
    iso_country: zod_1.default.string(),
    iso_region: zod_1.default.string(),
    municipality: zod_1.default.string(),
    scheduled_service: zod_1.default.string(),
    gps_code: zod_1.default.string(),
    iata_code: zod_1.default.string(),
    local_code: zod_1.default.string(),
    home_link: zod_1.default.string(),
    wikipedia_link: zod_1.default.string(),
    keywords: zod_1.default.string()
});
const Airports = zod_1.default.array(Airport);
const trpcRouter = trpc.router()
    .query('list', {
    async resolve() {
        const csvPromise = new Promise((res, rej) => {
            const headers = ['id', 'ident', 'type', 'name', 'latitude_deg', 'longitude_deg', 'elevation_ft',
                'continent', 'iso_country', 'iso_region', 'municipality', 'scheduled_service',
                'gps_code', 'iata_code', 'local_code', 'home_link', 'wikipedia_link', 'keywords'];
            const data = fs.readFileSync(require.resolve("../airports.csv"), { encoding: 'utf-8' });
            (0, csv_parse_1.parse)(data, {
                delimiter: ',',
                columns: headers,
                on_record: (line, context) => {
                    if (line.municipality !== 'Stockholm') {
                        return;
                    }
                    return line;
                },
            }, (error, result) => {
                if (error) {
                    rej(console.error(error));
                }
                airports = result;
                res('complete');
            });
        });
        await csvPromise;
        return airports;
    },
});
exports.default = trpcRouter;
