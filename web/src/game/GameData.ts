// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { IllegalArgumentException, arraycopy, bor, idiv } from "../runtime/java";
import { IntList } from "./IntList";
import { Game } from "./Game";
import { Townsman } from "./Townsman";
import { Engine } from "./Engine";
import { Level } from "./Level";
import { Building } from "./Building";
import { GameUi } from "./GameUi";

export class GameData {
  static regionNameTextIds: Int32Array = Int32Array.of(65672, 65673, 65674, 65675, 65676, 65677, 65678, 65679, 65680, 65681, 65682, 65683, 65684, 65685, 65686, 65687);
  static regionAdjacency: boolean[][] = [[false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false], [true, false, true, false, false, false, false, false, true, true, false, false, false, false, false, false], [true, true, false, true, true, false, false, true, false, false, false, false, false, false, false, false], [true, false, true, false, true, true, false, false, false, false, false, false, false, false, false, false], [false, false, true, true, false, true, true, true, false, false, false, false, false, false, false, false], [false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, true, false, false, true, false, false, false, false, false, true, true, false], [false, false, true, false, true, false, true, false, true, false, false, false, false, true, false, false], [false, true, true, false, false, false, false, true, false, true, false, true, false, false, false, false], [false, true, false, false, false, false, false, false, true, false, true, true, false, false, false, false], [false, false, false, false, false, false, false, false, false, true, false, true, false, false, false, false], [false, false, false, false, false, false, false, false, true, true, true, false, true, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, false], [false, false, false, false, false, false, true, true, false, false, false, false, true, false, true, false], [false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false], [false, false, false, false, false, false, false, true, true, false, false, true, true, true, false, false]];
  static field_500: Int8Array = Int8Array.of(-1, -1, -1, -1, -1, -1, -1, 3, 0, 0, 0, 7, 6, 5, 0, 5);
  static field_501: Int32Array = Int32Array.of(1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
  static regionRewardOptions: Int32Array[] = [Int32Array.of(131074, 2), Int32Array.of(2, 262146), Int32Array.of(65538, 196610), Int32Array.of(2, 131074), Int32Array.of(196610, 65538), Int32Array.of(655364), Int32Array.of(524290, 393218), Int32Array.of(196610, 65538), Int32Array.of(262146, 2), Int32Array.of(393218, 2), Int32Array.of(720900), Int32Array.of(131074, 196610), Int32Array.of(65538, 131074), Int32Array.of(524290, 458754), Int32Array.of(589828), Int32Array.of(-1)];
  static regionsRequiredToUnlock: Int32Array = Int32Array.of(0, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 9, 9, 9, 9, 12);
  private static field_504: Int32Array = Int32Array.of(0, 3, 6);
  private static field_505: Int32Array = Int32Array.of(2, 3, 4);
  private static field_506: Int32Array = Int32Array.of(2, 3, 4);
  private static field_507: Int32Array = Int32Array.of(1, 2, 3);
  private static field_508: Int32Array = Int32Array.of(2);
  private static field_509: Int32Array = Int32Array.of(2, 4, 6);
  private static field_510: Int32Array = Int32Array.of(1, 2, 4);
  private static field_511: Int32Array = Int32Array.of(1, 2, 4);
  private static field_512: Int32Array = Int32Array.of(1, 2, 3);
  private static field_513: Int32Array = Int32Array.of(1, 2, 4);
  private static field_514: Int32Array = Int32Array.of(1, 2, 4);
  private static field_515: Int32Array = Int32Array.of(5);
  private static field_516: Int32Array = Int32Array.of(4);
  private static field_517: Int32Array = Int32Array.of(2, 4, 6);
  private static field_518: Int32Array = Int32Array.of(1, 2, 3);
  private static field_519: Int32Array[] = [new Int32Array(0), Int32Array.of(65551, 524298, 655365, 1114137), Int32Array.of(65546, 524303, 655370, 1114162)];
  private static field_520: Int32Array[] = [Int32Array.of(5, 1114114), Int32Array.of(8, 65540, 524290, 1114117), Int32Array.of(10, 65544, 655366, 1114122)];
  private static field_521: Int32Array[] = [Int32Array.of(2, 65538), Int32Array.of(2, 65542, 524290, 655362), Int32Array.of(6, 65548, 524292, 655365)];
  private static field_522: Int32Array[] = [Int32Array.of(3), Int32Array.of(4, 65540, 524290), Int32Array.of(6, 65546, 524294, 655364)];
  private static field_523: Int32Array[] = [Int32Array.of(4, 65540)];
  private static field_524: Int32Array[] = [Int32Array.of(3, 65537), Int32Array.of(5, 65539, 655362), Int32Array.of(10, 65542, 524292, 655364)];
  private static field_525: Int32Array[] = [Int32Array.of(4, 65542), Int32Array.of(6, 65544, 655362), Int32Array.of(8, 65544, 524294, 655365)];
  private static field_526: Int32Array[] = [Int32Array.of(5, 65541), Int32Array.of(8, 65544, 524292, 655362), Int32Array.of(10, 65548, 524294, 655364)];
  private static field_527: Int32Array[] = [Int32Array.of(5), Int32Array.of(5, 65541, 655362), Int32Array.of(8, 65546, 655365)];
  private static field_528: Int32Array[] = [Int32Array.of(2), Int32Array.of(6, 65538), Int32Array.of(12, 65541, 524292, 655364)];
  private static field_529: Int32Array[] = [Int32Array.of(3), Int32Array.of(8, 65538), Int32Array.of(10, 524294, 655365)];
  private static field_530: Int32Array[] = [Int32Array.of(8, 65544, 1114132)];
  private static field_531: Int32Array[] = [Int32Array.of(8, 65551, 655365, 1114122)];
  private static field_532: Int32Array[] = [Int32Array.of(6, 65540), Int32Array.of(10, 65546, 524292, 655362), Int32Array.of(8, 65550, 524298, 655366)];
  private static field_533: Int32Array[] = [Int32Array.of(4, 65538), Int32Array.of(6, 65542, 524292, 655362), Int32Array.of(8, 65548, 524296, 655365)];
  private static field_534: Int32Array[][] = [[Int32Array.of(1048576, 83886080, -1493172218, 1124073472, 822083585, -268435456, 16777216, 805306369, 1073741924, -251658240)], [Int32Array.of(1048576, 83886080, -1493172218, 1124073472, 822083585, -268435456, 16777216, 805306369, 1073741884, -251658240)], [Int32Array.of(1048576, 83886080, -1493172218, 1124073472, 822083585, -268435456, 16777216, 805306369, 1073741884, -251658240)]];
  private static field_535: Int32Array[][] = [[Int32Array.of(393222, 196612, 65537, 16777216, 268500993, 16777216, 285409796, -1560281085, -1543503870, 50331648, 1073741884, 554041346, -1493172224, 50331648, 1073741884, 554041346, -1493172224, 50331648, 1073741884, 554041346, 33554432, -268435456)]];
  private static field_536: Int32Array[][] = [[Int32Array.of(131073, 50331648, 1073741904, 537001985, 33554432, -268435456)], [Int32Array.of(131074, 50331648, 1073741944, 537001986, 33554432, -268435456)], [Int32Array.of(131076, 50331648, 1073741984, 537001988, 33554432, -268435456)]];
  private static field_537: Int32Array[][] = [[Int32Array.of(262145, 67108864, 1090519050, 302252033, 50331648, 1073741874, 570687489, 33554432, -268435456), Int32Array.of(196610, 67108864, 1090519060, -234684415, 1090519060, 570621954, 33554432, -268435456)], [Int32Array.of(262146, 67108864, 1090519050, -234618879, 1090519050, 302252034, 50331648, 1073741904, 570687490, 33554432, -268435456), Int32Array.of(196611, 67108864, 1090519060, -234684415, 1090519060, -234684414, 1090519060, 570621955, 33554432, -268435456)], [Int32Array.of(262147, 67108864, 1090519050, -234618879, 1090519050, -234618878, 1090519050, 302252035, 50331648, 1073741924, 570687491, 33554432, -268435456), Int32Array.of(196612, 67108864, 1090519060, -234684414, 1090519060, 570621956, 33554432, -268435456)]];
  private static field_538: Int32Array[][] = [[Int32Array.of(458754, 393220, 327682, 1, 83886080, 1124073472, 822083586, 16777216, 268435457, 16777216, 285606404, 1073741924, -1543503870, 554106882, 33554432, -268435456)], [Int32Array.of(458756, 393222, 327682, 2, 83886080, 1124073472, 822083586, 16777216, 268435458, 16777216, 285606662, 1073741904, -1560281086, -1543503869, 554106882, -1493172205, 50331648, 1073741904, 554106882, 33554432, -268435456)], [Int32Array.of(458758, 393224, 327683, 3, 83886080, 1124073472, 822083586, 16777216, 268435459, 16777216, 285606920, -1560281085, -1543503868, 1073741884, 554106882, -1493172206, 50331648, -1526726643, 33554432, -268435456)]];
  private static field_539: Int32Array[][] = [[Int32Array.of(655362, 524289, 1, 327681, 83886080, 1124073472, 822411265, 16777216, 268435457, 16777216, 268959745, 50331648, 1073741984, 537526274, 33554432, -268435456), Int32Array.of(589825, 524290, 1, 327681, 83886080, 1124073472, 822411265, 16777216, 268435457, 16777216, 268959746, 50331648, 1073741964, 537460737, 33554432, -268435456)], [Int32Array.of(655364, 524290, 2, 327681, 83886080, 1124073472, 822411265, 16777216, 268435458, 16777216, 285737218, 50331648, 1073742044, -1560281086, 554303492, 33554432, -268435456), Int32Array.of(589826, 524292, 2, 327682, 83886080, 1124073472, 822411266, 16777216, 268435458, 16777216, 285737476, 50331648, 1073742024, -1543503870, 554237954, 33554432, -268435456)], [Int32Array.of(655366, 524291, 3, 327683, 83886080, 1124073472, 822411267, 16777216, 268435459, 16777216, 285737475, 50331648, 1073741944, -1560281085, -1543503870, 554303491, -1493172204, 50331648, 1073741944, 554303491, 33554432, -268435456), Int32Array.of(589828, 524294, 3, 327682, 83886080, 1124073472, 822411266, 16777216, 268435459, 16777216, 285737478, 50331648, 1073741974, -1560281086, -1543503869, 554237954, -1493172204, 50331648, 1073741974, 554237954, 33554432, -268435456)]];
  private static field_540: Int32Array[][] = [[Int32Array.of(2, 67108864, 1090519060, -234881023, 1090519060, 301989890, 1073741844, 536870914, 33554432, -268435456)], [Int32Array.of(4, 67108864, 1090519050, -234881023, 1090519050, -234881022, 1090519050, -234881021, 1090519050, 301989892, 1073741884, 536870916, 33554432, -268435456)], [Int32Array.of(6, 67108864, 1090519060, -234881022, 1090519060, -234881020, 1090519060, 301989894, 1073741884, 536870918, 33554432, -268435456)]];
  private static field_541: Int32Array[][] = [[Int32Array.of(65537, 50331648, 1073741924, 536936449, 33554432, -268435456)], [Int32Array.of(65538, 50331648, 1073741904, -234815487, 1073741904, 536936450, 33554432, -268435456), Int32Array.of(524289, 50331648, 1073741964, 537395201, 33554432, -268435456)], [Int32Array.of(65540, 50331648, 1073741884, -234815487, 1073741884, -234815486, 1073741884, -234815485, 1073741884, 536936452, 33554432, -268435456), Int32Array.of(524290, 50331648, 1073742064, 537395202, 33554432, -268435456)]];
  private static field_542: Int32Array[][] = [[Int32Array.of(917505, 1114117, 720897, 50331648, 1610612736, 100663296, 269549573, 16777216, 269156353, 50331648, 1073742024, 1627389952)]];
  private static field_543: Int32Array[][] = [[Int32Array.of(786433, 720897, 327681, 458754, 1342177280, 83886080, 1124073472, 822083585, 16777216, 269156353, 16777216, 268894210, 50331648, 1073742024, 1375731712)], [Int32Array.of(786433, 720897, 327681, 458754, 1342177280, 83886080, 1124073472, 822083585, 16777216, 269156353, 16777216, 268894210, 50331648, 1073742004, 1375731712)], [Int32Array.of(786433, 720897, 327681, 458754, 1342177280, 83886080, 1124073472, 822083585, 16777216, 269156353, 16777216, 268894210, 50331648, 1073741984, 1375731712)]];
  private static field_544: Int32Array[][] = [[Int32Array.of(851969, 589825, 458754, 1114117, 1342177280, 100663296, 269549573, 16777216, 268894210, 16777216, 269025281, 50331648, 1073742024, 1358954496)], [Int32Array.of(851969, 589825, 458754, 1114117, 1342177280, 100663296, 269549573, 16777216, 268894210, 16777216, 269025281, 50331648, 1073742004, 1358954496)], [Int32Array.of(851969, 589825, 458754, 1114117, 1342177280, 100663296, 269549573, 16777216, 268894210, 16777216, 269025281, 50331648, 1073741984, 1358954496)]];
  private static field_545: Int32Array = Int32Array.of(0, 5, 11);
  private static field_546: Int32Array = Int32Array.of(0, 5, 9);
  private static field_547: Int32Array = Int32Array.of(0, 3, 8);
  private static field_548: Int32Array = Int32Array.of(0, 3, 11);
  private static field_549: Int32Array = Int32Array.of(0);
  private static field_550: Int32Array = Int32Array.of(0, 2, 8);
  private static field_551: Int32Array = Int32Array.of(0, 4, 10);
  private static field_552: Int32Array = Int32Array.of(0, 4, 10);
  private static field_553: Int32Array = Int32Array.of(0, 1, 7);
  private static field_554: Int32Array = Int32Array.of(0, 1, 7);
  private static field_555: Int32Array = Int32Array.of(0, 2, 9);
  private static field_556: Int32Array = Int32Array.of(0);
  private static field_557: Int32Array = Int32Array.of(0);
  private static field_558: Int32Array = Int32Array.of(0, 6, 12);
  private static field_559: Int32Array = Int32Array.of(0, 6, 12);
  private static workerScripts: Int32Array[][][] = [null, null, null, GameData.field_534, GameData.field_535, GameData.field_537, GameData.field_538, GameData.field_539, GameData.field_536, GameData.field_540, GameData.field_541, null, GameData.field_542, GameData.field_543, GameData.field_544];
  private static workerSlots: Int32Array[] = [GameData.field_504, GameData.field_505, GameData.field_506, GameData.field_507, GameData.field_508, GameData.field_509, GameData.field_510, GameData.field_511, GameData.field_512, GameData.field_513, GameData.field_514, GameData.field_515, GameData.field_516, GameData.field_517, GameData.field_518];
  static requiredTechLevels: Int32Array[] = [GameData.field_545, GameData.field_546, GameData.field_547, GameData.field_548, GameData.field_549, GameData.field_550, GameData.field_551, GameData.field_552, GameData.field_553, GameData.field_554, GameData.field_555, GameData.field_556, GameData.field_557, GameData.field_558, GameData.field_559];
  static researchPointsPerLevel: Int32Array = Int32Array.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24);
  static buildingAllowed: boolean[] = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  private static buildingLimits: Int32Array[] = [Int32Array.of(1, 1, 1), Int32Array.of(2, 4, 6), Int32Array.of(2, 4, 6), Int32Array.of(4, 7, 10), Int32Array.of(2, 4, 6), Int32Array.of(2, 4, 6), Int32Array.of(2, 4, 6), Int32Array.of(2, 4, 6), Int32Array.of(2, 4, 6), Int32Array.of(2, 4, 6), Int32Array.of(2, 4, 6), Int32Array.of(1, 1, 1), Int32Array.of(1, 1, 1), Int32Array.of(1, 1, 1), Int32Array.of(2, 4, 6)];
  static houseCapacity: Int32Array = Int32Array.of(2, 4, 6);
  private static field_567: Int32Array = Int32Array.of(1, 2, 3);
  private static field_568: Int32Array = Int32Array.of(2, 4, 6);
  private static buildCosts: Int32Array[][] = [GameData.field_519, GameData.field_520, GameData.field_521, GameData.field_522, GameData.field_523, GameData.field_524, GameData.field_525, GameData.field_526, GameData.field_527, GameData.field_528, GameData.field_529, GameData.field_530, GameData.field_531, GameData.field_532, GameData.field_533];
  private static constructionScript: Int32Array = Int32Array.of(983040, 16777216, 318767104, 1107296306);
  private static field_571: Int32Array = Int32Array.of(983040, 67108864, 1090519060, 301989890, 1107296306);
  static field_572: Int32Array = Int32Array.of(30, 20, 10);
  static storageCapacity: Int32Array = Int32Array.of(5, 10, 15);
  static field_574: Int32Array = Int32Array.of(0, 1, 2);
  static field_575: Int32Array = Int32Array.of(100, 150, 200);
  static field_576: Int32Array = Int32Array.of(100, 125, 150);
  private static levelAnchorBuilding: Building = null;
  private static enemyAnchorBuilding: Building = null;
  static tipShown: boolean[] = new Array<boolean>(12).fill(false);
  constructor() {
  }
  static applyLevelSettings(var0: Level): void {
    switch (var0.levelIndex as number) {
      case 0:
        var0.width = 10;
        var0.height = 10;
        var0.genRivers = 0;
        var0.genPonds = 0;
        var0.genRocks = 4;
        var0.genTrees = 8;
        var0.genForestsGaussFactor = -3;
        var0.genSeaEdges = 2;
        var0.genMaxBridges = 0;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 1:
        var0.width = 10;
        var0.height = 12;
        var0.genRivers = 0;
        var0.genPonds = 1;
        var0.genRocks = 4;
        var0.genTrees = 8;
        var0.genForestsGaussFactor = -4;
        var0.genSeaEdges = 2;
        var0.genMaxBridges = 0;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 2:
        var0.width = 12;
        var0.height = 10;
        var0.genRivers = 1;
        var0.genPonds = 0;
        var0.genRocks = 10;
        var0.genTrees = 10;
        var0.genForestsGaussFactor = -2;
        var0.genSeaEdges = 0;
        var0.genMaxBridges = 2;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 3:
        var0.width = 14;
        var0.height = 12;
        var0.genRivers = 0;
        var0.genPonds = 1;
        var0.genRocks = 8;
        var0.genTrees = 10;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 8;
        var0.genMaxBridges = 0;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 4:
        var0.width = 16;
        var0.height = 14;
        var0.genRivers = 1;
        var0.genPonds = 2;
        var0.genRocks = 10;
        var0.genTrees = 8;
        var0.genForestsGaussFactor = -4;
        var0.genSeaEdges = 0;
        var0.genMaxBridges = 2;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 5:
        var0.width = 12;
        var0.height = 16;
        var0.genRivers = 1;
        var0.genPonds = 1;
        var0.genRocks = 16;
        var0.genTrees = 6;
        var0.genForestsGaussFactor = -4;
        var0.genSeaEdges = 4;
        var0.genMaxBridges = 3;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 6:
        var0.width = 18;
        var0.height = 14;
        var0.genRivers = 1;
        var0.genPonds = 0;
        var0.genRocks = 8;
        var0.genTrees = 10;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 0;
        var0.genMaxBridges = 2;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 7:
        var0.width = 18;
        var0.height = 18;
        var0.genRivers = 1;
        var0.genPonds = 0;
        var0.genRocks = 4;
        var0.genTrees = 12;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 0;
        var0.genMaxBridges = 3;
        var0.genMinIslandSize = 20;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 8:
        var0.width = 18;
        var0.height = 18;
        var0.genRivers = 2;
        var0.genPonds = 0;
        var0.genRocks = 8;
        var0.genTrees = 20;
        var0.genForestsGaussFactor = -2;
        var0.genSeaEdges = 0;
        var0.genMaxBridges = 2;
        var0.genMinIslandSize = 20;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 9:
        var0.width = 20;
        var0.height = 16;
        var0.genRivers = 1;
        var0.genPonds = 1;
        var0.genRocks = 0;
        var0.genTrees = 18;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 2;
        var0.genMaxBridges = 2;
        var0.genMinIslandSize = 20;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 10:
        var0.width = 18;
        var0.height = 24;
        var0.genRivers = 0;
        var0.genPonds = 0;
        var0.genRocks = 6;
        var0.genTrees = 16;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 7;
        var0.genMaxBridges = 0;
        var0.genMinIslandSize = 20;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 11:
        var0.width = 18;
        var0.height = 26;
        var0.genRivers = 1;
        var0.genPonds = 0;
        var0.genRocks = 6;
        var0.genTrees = 18;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 1;
        var0.genMaxBridges = 4;
        var0.genMinIslandSize = 20;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 12:
        var0.width = 24;
        var0.height = 24;
        var0.genRivers = 0;
        var0.genPonds = 0;
        var0.genRocks = 0;
        var0.genTrees = 18;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 3;
        var0.genMaxBridges = 0;
        var0.genMinIslandSize = 25;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 13:
        var0.width = 24;
        var0.height = 18;
        var0.genRivers = 2;
        var0.genPonds = 0;
        var0.genRocks = 24;
        var0.genTrees = 14;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 0;
        var0.genMaxBridges = 2;
        var0.genMinIslandSize = 20;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
        break;
      case 14:
        var0.width = 15;
        var0.height = 20;
        var0.genRivers = 1;
        var0.genPonds = 0;
        var0.genRocks = 8;
        var0.genTrees = 12;
        var0.genForestsGaussFactor = 2;
        var0.genSeaEdges = 0;
        var0.genMaxBridges = 4;
        var0.genMinIslandSize = 15;
        var0.genLandDecorPercent = 15;
        var0.genWaterDecorPercent = 10;
    }
    if (var0.levelIndex === (-1)) {
      switch (Level.openEndSize as number) {
        case 0:
          var0.width = Engine.randomRange(10, 10);
          var0.height = Engine.randomRange(10, 10);
          break;
        case 1:
          var0.width = Engine.randomRange(13, 15);
          var0.height = Engine.randomRange(13, 15);
          break;
        case 2:
          var0.width = Engine.randomRange(17, 20);
          var0.height = Engine.randomRange(17, 20);
          break;
        case 3:
          var0.width = Engine.randomRange(22, 25);
          var0.height = Engine.randomRange(22, 25);
          break;
        case 4:
          var0.width = Engine.randomRange(26, 30);
          var0.height = Engine.randomRange(26, 30);
          break;
        default:
          throw new IllegalArgumentException("Level.openEndSize is invalid!");
      }
      switch (Level.openEndWater as number) {
        case 0:
          var0.genSeaEdges = 0;
          var0.genPonds = 0;
          var0.genRivers = 1;
          break;
        case 1:
          var0.genSeaEdges = 0;
          var0.genPonds = 1;
          var0.genRivers = idiv(var0.width, 15);
          break;
        case 2:
          var0.genSeaEdges = 0;
          var0.genPonds = idiv(var0.width, 4);
          var0.genRivers = 0;
          break;
        case 3:
          var0.genSeaEdges = 1 << Engine.randomInt(4);
          var0.genPonds = idiv(var0.width, 16);
          var0.genRivers = 0;
          break;
        case 4:
          var0.genSeaEdges = 1 << Engine.randomInt(2) << 2;
          var0.genSeaEdges = var0.genSeaEdges | 1 << Engine.randomInt(2);
          var0.genPonds = 0;
          var0.genRivers = 0;
          break;
        default:
          throw new IllegalArgumentException("Level.openEndWater is invalid!");
      }
      var0.genMinIslandSize = 5 + Math.imul(Math.max(0, var0.genRivers), 10);
      var0.genForestsGaussFactor = Engine.randomBool() ? Engine.randomRange(1, 3) : -Engine.randomRange(1, 3);
      var0.genTrees = Math.max(idiv(Math.imul(var0.width, var0.height), 15), 2);
      var0.genRocks = Math.max(idiv(Math.imul(var0.width, var0.height), 50), 2);
      var0.genMaxBridges = idiv(var0.width, 5);
      var0.genLandDecorPercent = 15;
      var0.genWaterDecorPercent = 10;
      var0.rainChance = 10;
      var0.stormChance = 10;
    }
  }
  static getWorkerScript(var0: number, var1: number, var2: number): Int32Array {
    if (GameData.workerScripts[var0] !== null) {
      return GameData.workerScripts[var0][var1].length > var2 ? GameData.workerScripts[var0][var1][var2] : null;
    } else {
      return null;
    }
  }
  static getConstructionScript(): Int32Array {
    return GameData.constructionScript;
  }
  static method_532(): Int32Array {
    return GameData.field_571;
  }
  static getWorkerSlotCount(var0: number, var1: number): number {
    return GameData.workerSlots[var0][var1];
  }
  static getMaxLevel(var0: number): number {
    return GameData.workerSlots[var0].length - 1;
  }
  private static getRequiredTechLevel(var0: number, var1: number): number {
    return GameData.requiredTechLevels[var0][Math.min(var1, GameData.getMaxLevel(var0))];
  }
  static getGarrisonCapacity(var0: number, var1: number): number {
    switch (var0) {
      case 13:
        return GameData.field_568[var1];
      case 14:
        return GameData.field_567[var1];
      default:
        return 0;
    }
  }
  static getBuildCost(var0: number, var1: number): Int32Array {
    let var2: Int32Array = new Int32Array(GameData.buildCosts[var0][var1].length);
    arraycopy(GameData.buildCosts[var0][var1], 0, var2, 0, var2.length);
    return var2;
  }
  static getTotalBuildCost(var0: number, var1: number): Int32Array {
    let var2: Int32Array = new Int32Array(21);
    for (let var3: number = 0; var3 <= var1; var3++) {
      let var4: Int32Array = GameData.getBuildCost(var0, var3);
      for (let var5: number = 0; var5 < var4.length; var5++) {
        var2[Game.packedResource(var4[var5]) >> 16] += Game.packedAmount(var4[var5]);
      }
    }
    let var6: number = 0;
    for (let var8: number = 0; var8 < var2.length; var8++) {
      if (var2[var8] > 0) {
        var6++;
      }
    }
    let var9: Int32Array = new Int32Array(var6);
    var6 = 0;
    for (let var10: number = 0; var10 < var2.length; var10++) {
      if (var2[var10] > 0) {
        var9[var6++] = var10 << 16 | var2[var10];
      }
    }
    return var9;
  }
  static setAllBuildingsAllowed(var0: boolean): void {
    for (let var1: number = 0; var1 < GameData.buildingAllowed.length; var1++) {
      GameData.buildingAllowed[var1] = var0;
    }
    Game.buildMenuEnabled = var0;
  }
  private static setBuildingAllowed(var0: number, var1: boolean): void {
    GameData.buildingAllowed[var0] = var1;
    Game.buildMenuEnabled = bor(Game.buildMenuEnabled, var1);
  }
  static canBuild(var0: number, var1: number): boolean {
    let var2: boolean = false;
    if (var1 >= 0 && var1 <= 2 && var1 <= GameData.getMaxLevel(var0)) {
      switch (var0) {
        case 0:
          var2 = Building.mainBuilding === null && var1 === 0;
          break;
        default:
          var2 = Building.mainBuilding !== null && Building.countByTypeLevel[var0][0] + Building.countByTypeLevel[var0][1] + Building.countByTypeLevel[var0][2] < GameData.buildingLimits[var0][Building.mainBuilding.isComplete() ? Building.mainBuilding.level : Building.mainBuilding.level - 1];
      }
      return Game.researchLevel >= GameData.getRequiredTechLevel(var0, var1) && GameData.buildingAllowed[var0] && var2;
    } else {
      return false;
    }
  }
  static isBuildingUnlocked(var0: number, var1: number): boolean {
    return var1 >= 0 && var1 <= 2 && var1 <= GameData.getMaxLevel(var0) ? Game.researchLevel >= GameData.getRequiredTechLevel(var0, var1) && GameData.buildingAllowed[var0] : false;
  }
  static isFinalRegionUnlocked(): boolean {
    for (let var0: number = 0; var0 < GameData.regionAdjacency[15].length; var0++) {
      if (GameData.regionAdjacency[15][var0] && !Game.departmentConquered[var0]) {
        return false;
      }
    }
    return true;
  }
  static getFoodHappinessDelta(var0: number, var1: number): number {
    switch (var0) {
      case 131072:
        return 1 - var1;
      case 262144:
        return 2 - var1;
      case 458752:
        return 3 - var1;
      default:
        return 0 - var1;
    }
  }
  static onTechLevelUp(): void {
    let var0: GameUi = null;
    (var0 = new GameUi()).setPanTo(Level.randomBuildingOfType(12, 0));
    var0.setText(Engine.getText(262160), 1, 0, 1, Engine.getColor(25), Engine.getColor(25));
    var0.setPortrait(16514);
    var0.setResearchUnlockText();
    GameUi.queueMessage(var0);
    if (Game.researchLevel === Game.maxResearchLevel && Game.researchLevel < GameData.researchPointsPerLevel.length) {
      (var0 = new GameUi()).setText(Engine.getText(65690), 1, 0, 1, Engine.getColor(25), Engine.getColor(25));
      var0.setPortrait(16514);
      GameUi.queueMessage(var0);
    }
  }
  static showFirstTip(): void {
    GameData.showTipOnce(0);
  }
  static initLevelScript(): void {
    switch (Game.level.levelIndex as number) {
      case 0:
        Game.setWeather(0);
        Game.level.rainChance = -1;
        Game.setMerchantSchedule(-1, 0, 0, 0, 0);
        GameData.setAllBuildingsAllowed(false);
        Game.gameSpeed = 0;
        let var22: GameUi = null;
        (var22 = new GameUi()).setPanTo(Building.mainBuilding);
        var22.setText(Engine.getText(65583), 1, 0, 1, 0, 0);
        var22.setPortrait(16514);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65584), 1, 0, 1, 0, 0);
        var22.setPortrait(16513);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65585), 1, 0, 1, 0, 0);
        var22.setPortrait(16514);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65586), 1, 0, 1, 0, 0);
        var22.setPortrait(16514);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65587), 1, 0, 1, 0, 0);
        var22.setPortrait(16513);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65588), 1, 0, 1, 0, 0);
        var22.setPortrait(16514);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65589), 1, 0, 1, 0, 0);
        var22.setPortrait(16513);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65590), 1, 0, 1, 0, 0);
        var22.setPortrait(16514);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).setText(Engine.getText(65594), 1, 0, 1, 0, 0);
        var22.setPortrait(16514);
        GameUi.queueMessage(var22);
        (var22 = new GameUi()).field_207 = 1;
        var22.setTextWithSubstitutions(Engine.getText(65574), Int32Array.of(1, -1, -1, 1, 0, 0, 0), Int32Array.of(1, -1, -1, 1, 0, Engine.getColor(30), Engine.getColor(30)), Engine.getKeyNames());
        var22.setPortrait(16512);
        GameUi.queueMessage(var22);
        Game.showLogbook();
        (var22 = new GameUi()).setText(Engine.getText(65564), 1, 0, 1, 0, 0);
        var22.setPanTo(GameData.levelAnchorBuilding);
        var22.setPortrait(16512);
        GameUi.queueMessage(var22);
        Game.gameSpeed = 1;
        break;
      case 1:
        Game.setWeather(0);
        Game.level.rainChance = 15;
        Game.level.stormChance = 5;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var20: GameUi = null;
        (var20 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var20.setPanDuration(1500);
        GameUi.queueMessage(var20);
        (var20 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var20.setPortrait(16514);
        var20.field_207 = 50;
        GameUi.queueMessage(var20);
        Game.gameSpeed = 0;
        Game.setMerchantSchedule(2, 2, 3, 1, 1);
        Game.setMerchantDemand(Int32Array.of(5, 65546, 655370, 131074, 262154, 458762, 393226, 196618, 720896, 524298, 589834));
        Game.setMerchantSupply(Int32Array.of(4, 65538, 655362, 131082, 262146, 458754, 393218, 196610, 720906, 524290, 589826));
        break;
      case 2:
        Game.setWeather(0);
        Game.level.rainChance = 20;
        Game.level.stormChance = 10;
        Game.setMerchantSchedule(-1, 0, 0, 0, 0);
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var18: GameUi = null;
        (var18 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var18.setPanDuration(2000);
        GameUi.queueMessage(var18);
        (var18 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var18.setPortrait(16514);
        var18.field_207 = 50;
        GameUi.queueMessage(var18);
        Game.gameSpeed = 0;
        break;
      case 3:
        Game.setWeather(1);
        Game.level.rainChance = 20;
        Game.level.stormChance = 5;
        Game.setMerchantSchedule(-1, 0, 0, 0, 0);
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var16: GameUi = null;
        (var16 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var16.setPanDuration(2000);
        GameUi.queueMessage(var16);
        (var16 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var16.setPortrait(16514);
        var16.field_207 = 50;
        GameUi.queueMessage(var16);
        Game.gameSpeed = 0;
        break;
      case 4:
        Game.setWeather(0);
        Game.level.rainChance = 30;
        Game.level.stormChance = 10;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var14: GameUi = null;
        (var14 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var14.setPanDuration(2000);
        GameUi.queueMessage(var14);
        (var14 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var14.setPortrait(16514);
        var14.field_207 = 50;
        GameUi.queueMessage(var14);
        Game.gameSpeed = 0;
        break;
      case 5:
        Game.setWeather(1);
        Game.level.rainChance = 30;
        Game.level.stormChance = 20;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var12: GameUi = null;
        (var12 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var12.setPanDuration(2000);
        GameUi.queueMessage(var12);
        (var12 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var12.setPortrait(16514);
        var12.field_207 = 50;
        GameUi.queueMessage(var12);
        Game.setMerchantSchedule(3, 4, 6, 1, 1);
        Game.setMerchantDemand(Int32Array.of(5, 65541, 655370, 131082, 262154, 458762, 393226, 196618, 720906, 524298, 589834));
        Game.setMerchantSupply(Int32Array.of(8, 65546, 655362, 131080, 262148, 458756, 393220, 196612, 720898, 524292, 589827));
        Game.gameSpeed = 0;
        break;
      case 6:
        Game.setWeather(0);
        Game.level.rainChance = 30;
        Game.level.stormChance = 10;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var10: GameUi = null;
        (var10 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var10.setPanDuration(2000);
        GameUi.queueMessage(var10);
        (var10 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var10.setPortrait(16514);
        var10.field_207 = 50;
        GameUi.queueMessage(var10);
        Game.setMerchantSchedule(4, 4, 6, 1, 1);
        Game.setMerchantDemand(Int32Array.of(8, 65544, 655365, 131082, 262154, 458762, 393226, 196618, 720906, 524293, 589829));
        Game.setMerchantSupply(Int32Array.of(10, 65556, 655370, 131080, 262152, 458760, 393224, 196616, 720901, 524298, 589829));
        Game.gameSpeed = 0;
        break;
      case 7:
        Game.setWeather(0);
        Game.level.rainChance = 15;
        Game.level.stormChance = 10;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var8: GameUi = null;
        (var8 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var8.setPanDuration(2000);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var8.setPortrait(16514);
        var8.field_207 = 50;
        GameUi.queueMessage(var8);
        Game.gameSpeed = 0;
        Game.setMerchantSchedule(3, 3, 5, 1, 1);
        Game.setMerchantDemand(Int32Array.of(8, 65544, 655365, 131082, 262154, 458762, 393226, 196618, 720906, 524293, 589829));
        Game.setMerchantSupply(Int32Array.of(8, 65544, 655365, 131080, 262152, 458760, 393224, 196616, 720900, 524293, 589828));
        break;
      case 8:
        Game.setWeather(0);
        Game.level.rainChance = 15;
        Game.level.stormChance = 2;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var7: GameUi = null;
        (var7 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var7.setPortrait(16514);
        var7.field_207 = 50;
        GameUi.queueMessage(var7);
        Game.setMerchantSchedule(3, 3, 5, 1, 1);
        Game.setMerchantDemand(Int32Array.of(10, 65546, 655368, 131082, 262154, 458762, 393226, 196618, 720906, 524298, 589829));
        Game.setMerchantSupply(Int32Array.of(10, 65546, 655366, 131082, 262154, 458762, 393226, 196618, 720904, 524296, 589826));
        Game.gameSpeed = 0;
        break;
      case 9:
        Game.setWeather(0);
        Game.level.rainChance = 15;
        Game.level.stormChance = 2;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var6: GameUi = null;
        (var6 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var6.setPortrait(16514);
        var6.field_207 = 50;
        GameUi.queueMessage(var6);
        Game.gameSpeed = 0;
        Game.setMerchantSchedule(5, 4, 6, 1, 1);
        Game.setMerchantDemand(Int32Array.of(20, 65576, 655370, 131092, 262164, 458792, 393246, 196628, 720936, 524308, 589834));
        Game.setMerchantSupply(Int32Array.of(10, 65544, 655365, 131092, 262164, 458762, 393226, 196628, 720901, 524296, 589826));
        break;
      case 10:
        Game.setWeather(0);
        Game.level.rainChance = 9;
        Game.level.stormChance = 1;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var4: GameUi = null;
        (var4 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var4.setPanDuration(2000);
        GameUi.queueMessage(var4);
        (var4 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var4.setPortrait(16514);
        var4.field_207 = 50;
        GameUi.queueMessage(var4);
        Game.setMerchantSchedule(5, 3, 5, 1, 1);
        Game.setMerchantDemand(Int32Array.of(20, 65576, 655370, 131092, 262164, 458792, 393246, 196628, 720936, 524308, 589834));
        Game.setMerchantSupply(Int32Array.of(10, 65541, 655365, 131092, 262164, 458762, 393226, 196628, 720901, 524293, 589826));
        Game.gameSpeed = 0;
        break;
      case 11:
        Game.setWeather(0);
        Game.level.rainChance = 12;
        Game.level.stormChance = 3;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var3: GameUi = null;
        (var3 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var3.setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var3.setPortrait(16514);
        var3.field_207 = 50;
        GameUi.queueMessage(var3);
        Game.setMerchantSchedule(5, 3, 5, 1, 1);
        Game.setMerchantDemand(Int32Array.of(20, 65576, 655370, 131092, 262164, 458792, 393246, 196628, 720936, 524308, 589834));
        Game.setMerchantSupply(Int32Array.of(10, 65541, 655365, 131092, 262164, 458762, 393226, 196628, 720901, 524293, 589826));
        Game.gameSpeed = 0;
        break;
      case 12:
        Game.setWeather(0);
        Game.level.rainChance = 15;
        Game.level.stormChance = 5;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var2: GameUi = null;
        (var2 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var2.setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var2.setPortrait(16514);
        var2.field_207 = 50;
        GameUi.queueMessage(var2);
        Game.setMerchantSchedule(5, 3, 5, 1, 1);
        Game.setMerchantDemand(Int32Array.of(20, 65576, 655370, 131092, 262164, 458792, 393246, 196628, 720936, 524308, 589834));
        Game.setMerchantSupply(Int32Array.of(10, 65546, 655365, 131092, 262164, 458762, 393226, 196628, 720901, 524298, 589829));
        Game.gameSpeed = 0;
        break;
      case 13:
        Game.setWeather(1);
        Game.level.rainChance = 20;
        Game.level.stormChance = 5;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var1: GameUi = null;
        (var1 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var1.setPortrait(16514);
        var1.field_207 = 50;
        GameUi.queueMessage(var1);
        Game.setMerchantSchedule(5, 3, 5, 1, 1);
        Game.setMerchantDemand(Int32Array.of(20, 65576, 655370, 131092, 262164, 458792, 393246, 196628, 720936, 524308, 589834));
        Game.setMerchantSupply(Int32Array.of(10, 65541, 655365, 131092, 262164, 458762, 393226, 196628, 720901, 524293, 589826));
        Game.gameSpeed = 0;
        break;
      case 14:
        Game.setWeather(0);
        Game.level.rainChance = 20;
        Game.level.stormChance = 5;
        GameData.setAllBuildingsAllowed(false);
        GameData.setBuildingAllowed(0, true);
        let var0: GameUi = null;
        (var0 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
        var0.setPortrait(16514);
        var0.field_207 = 50;
        GameUi.queueMessage(var0);
        Game.setMerchantSchedule(5, 3, 5, 1, 1);
        Game.setMerchantDemand(Int32Array.of(20, 65566, 655380, 131092, 262164, 458782, 393241, 196628, 720936, 524308, 589824));
        Game.setMerchantSupply(Int32Array.of(10, 65546, 655365, 131092, 262164, 458762, 393226, 196628, 720901, 524293, 589826));
        Game.gameSpeed = 0;
    }
    if (Game.level.levelIndex === (-1)) {
      Game.setWeather(0);
      Game.level.rainChance = 15;
      Game.level.stormChance = 5;
      let var33: GameUi = null;
      (var33 = new GameUi()).setText(Engine.getText(262161), 1, 0, 1, 0, 0);
      var33.setPortrait(16514);
      var33.field_207 = 50;
      GameUi.queueMessage(var33);
      Game.setMerchantSchedule(2, 3, 5, 1, 1);
      Game.setMerchantPrices(Int32Array.of(1, 65539, 655368, 131073, 262146, 458760, 393220, 196610, 720906, 524292, 589834));
      Game.setMerchantDemand(Int32Array.of(20, 65556, 655370, 131092, 262164, 458762, 393226, 196628, 720901, 524298, 589834));
      Game.setMerchantSupply(Int32Array.of(10, 65546, 655365, 131082, 262154, 458757, 393226, 196618, 720906, 524293, 589829));
    }
  }
  static onObjectivesCompleted(): void {
    switch (Game.level.levelIndex as number) {
      case 0:
        if (Game.scriptStep === 1) {
          Game.objectives.removeAllElements();
          let var51: GameUi = null;
          (var51 = new GameUi()).setText(Engine.getText(65595), 1, 0, 1, 0, 0);
          var51.setPortrait(16514);
          var51.setPanTo(Building.mainBuilding);
          GameUi.queueMessage(var51);
          let var52: Game = new Game().$init2(16384, 20, 3, null);
          Game.scriptStep = 2;
          Game.objectives.addElement(var52);
          Game.missionTitleTextId = 65576;
          Game.showLogbook();
          (var51 = new GameUi()).setTextWithSubstitutions(Engine.getText(65565), Int32Array.of(1, -1, -1, 1, 0, 0, 0), Int32Array.of(1, -1, -1, 1, 0, Engine.getColor(30), Engine.getColor(30)), Engine.getKeyNames());
          var51.setPortrait(16512);
          GameUi.queueMessage(var51);
          (var51 = new GameUi()).setText(Engine.getText(65566), 1, 0, 1, 0, 0);
          var51.setPortrait(16512);
          GameUi.queueMessage(var51);
          GameData.setBuildingAllowed(3, true);
          return;
        }
        if (Game.scriptStep === 2) {
          Game.objectives.removeAllElements();
          let var48: GameUi = null;
          (var48 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 0));
          var48.setText(Engine.getText(65596), 1, 0, 1, 0, 0);
          var48.setPortrait(16514);
          GameUi.queueMessage(var48);
          let var49: Game = new Game().$init2(16384, 25, 10, null);
          Game.scriptStep = 3;
          Game.objectives.addElement(var49);
          Game.missionTitleTextId = 65577;
          Game.showLogbook();
          (var48 = new GameUi()).setText(Engine.getText(65573), 1, 0, 1, 0, 0);
          var48.setPortrait(16512);
          GameUi.queueMessage(var48);
          GameData.setBuildingAllowed(10, true);
          GameData.setBuildingAllowed(3, false);
          return;
        }
        if (Game.scriptStep === 3) {
          Game.objectives.removeAllElements();
          let var46: GameUi = null;
          (var46 = new GameUi()).setPanTo(Level.randomBuildingOfType(10, 0));
          var46.setText(Engine.getText(65567), 1, 0, 1, 0, 0);
          var46.setPortrait(16512);
          GameUi.queueMessage(var46);
          let var47: Game = new Game().$init2(16384, 35, 2, null);
          Game.scriptStep = 4;
          Game.objectives.addElement(var47);
          Game.missionTitleTextId = 65578;
          Game.showLogbook();
          GameData.setBuildingAllowed(2, true);
          GameData.setBuildingAllowed(10, false);
          return;
        }
        if (Game.scriptStep === 4) {
          Game.objectives.removeAllElements();
          let var42: GameUi = null;
          (var42 = new GameUi()).setPanTo(Level.randomBuildingOfType(2, 0));
          var42.setText(Engine.getText(65597), 1, 0, 1, 0, 0);
          var42.setPortrait(16514);
          GameUi.queueMessage(var42);
          let var43: Game = new Game().$init2(16384, 14, 8, null);
          Game.scriptStep = 5;
          Game.objectives.addElement(var43);
          Game.missionTitleTextId = 65579;
          (var42 = new GameUi()).setText(Engine.getText(65568), 1, 0, 1, 0, 0);
          var42.setPortrait(16512);
          GameUi.queueMessage(var42);
          (var42 = new GameUi()).setText(Engine.getText(65569), 1, 0, 1, 0, 0);
          var42.setPortrait(16512);
          GameUi.queueMessage(var42);
          Game.showLogbook();
          GameData.setBuildingAllowed(8, true);
          GameData.setBuildingAllowed(2, false);
          return;
        }
        if (Game.scriptStep === 5) {
          Game.objectives.removeAllElements();
          let var39: GameUi = null;
          (var39 = new GameUi()).setPanTo(Level.randomBuildingOfType(8, 0));
          var39.setText(Engine.getText(65598), 1, 0, 1, 0, 0);
          var39.setPortrait(16514);
          GameUi.queueMessage(var39);
          let var40: Game = new Game().$init2(4096, 250, 4, null);
          Game.scriptStep = 6;
          Game.objectives.addElement(var40);
          Game.missionTitleTextId = 65580;
          Game.showLogbook();
          (var39 = new GameUi()).setText(Engine.getText(65570), 1, 0, 1, 0, 0);
          var39.setPortrait(16512);
          GameUi.queueMessage(var39);
          GameData.setBuildingAllowed(3, true);
          GameData.setBuildingAllowed(8, false);
          return;
        }
        if (Game.scriptStep === 6) {
          Game.objectives.removeAllElements();
          let var36: GameUi = null;
          (var36 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 0));
          var36.setText(Engine.getText(65599), 1, 0, 1, 0, 0);
          var36.setPortrait(16514);
          GameUi.queueMessage(var36);
          let var37: Game = new Game().$init2(16384, 10, 5, null);
          Game.scriptStep = 7;
          Game.objectives.addElement(var37);
          Game.missionTitleTextId = 65581;
          Game.showLogbook();
          (var36 = new GameUi()).setText(Engine.getText(65571), 1, 0, 1, 0, 0);
          var36.setPortrait(16512);
          GameUi.queueMessage(var36);
          GameData.setBuildingAllowed(3, false);
          GameData.setBuildingAllowed(5, true);
          return;
        }
        if (Game.scriptStep === 7) {
          Game.objectives.removeAllElements();
          let var32: GameUi = null;
          (var32 = new GameUi()).setPanTo(Level.randomBuildingOfType(5, 0));
          var32.setText(Engine.getText(65600), 1, 0, 1, 0, 0);
          var32.setPortrait(16514);
          GameUi.queueMessage(var32);
          let var33: Game = new Game().$init2(0, 243, 262146, null);
          Game.scriptStep = 8;
          Game.objectives.addElement(var33);
          Game.missionTitleTextId = 65582;
          Game.showLogbook();
          (var32 = new GameUi()).setText(Engine.getText(262146), 1, 0, 1, 0, 0);
          var32.setPortrait(16512);
          GameUi.queueMessage(var32);
          (var32 = new GameUi()).setText(Engine.getText(65572), 1, 0, 1, 0, 0);
          var32.setPortrait(16512);
          GameUi.queueMessage(var32);
          GameData.setBuildingAllowed(2, true);
          GameData.setBuildingAllowed(10, true);
          GameData.setBuildingAllowed(8, true);
          GameData.setBuildingAllowed(3, true);
          return;
        }
        if (Game.scriptStep === 8) {
          let var29: GameUi = null;
          (var29 = new GameUi()).setText(Engine.getText(65601), 1, 0, 1, 0, 0);
          var29.setPortrait(16514);
          GameUi.queueMessage(var29);
          (var29 = new GameUi()).setText(Engine.getText(65602), 1, 0, 1, 0, 0);
          var29.setPortrait(16513);
          GameUi.queueMessage(var29);
          (var29 = new GameUi()).setText(Engine.getText(65603), 1, 0, 1, 0, 0);
          var29.setPortrait(16514);
          var29.field_207 = 2147483647;
          GameUi.queueMessage(var29);
          return;
        }
        break;
      case 1:
        if (Game.scriptStep === 11) {
          let var28: GameUi = null;
          (var28 = new GameUi()).setPanTo(Level.randomBuildingOfType(12, 0));
          var28.setText(Engine.getText(65608), 1, 0, 1, 0, 0);
          var28.setPortrait(16514);
          var28.field_207 = 2147483647;
          GameUi.queueMessage(var28);
        }
        break;
      case 2:
        if (Game.scriptStep === 9) {
          Game.objectives.removeAllElements();
          let var23: GameUi = null;
          (var23 = new GameUi()).setPanTo(Level.randomBuildingOfType(1, 0));
          var23.setText(Engine.getText(65614), 1, 0, 1, 0, 0);
          var23.setPortrait(16514);
          GameUi.queueMessage(var23);
          (var23 = new GameUi()).setText(Engine.getText(65610), 1, 0, 1, 0, 0);
          var23.setPortrait(16512);
          GameUi.queueMessage(var23);
          GameData.setBuildingAllowed(4, true);
          GameData.setBuildingAllowed(6, true);
          let var25: Game = new Game().$init2(16384, 38, 4, null);
          Game.objectives.addElement(var25);
          let var26: Game = new Game().$init2(16384, 1, 6, null);
          Game.objectives.addElement(var26);
          let var27: Game = new Game().$init2(0, 236, 458756, null);
          Game.objectives.addElement(var27);
          Game.scriptStep = 10;
          Game.missionTitleTextId = 65612;
          return;
        }
        if (Game.scriptStep === 10) {
          let var22: GameUi = null;
          (var22 = new GameUi()).setText(Engine.getText(65615), 1, 0, 1, 0, 0);
          var22.setPortrait(16514);
          var22.field_207 = 2147483647;
          GameUi.queueMessage(var22);
          return;
        }
        break;
      case 3:
        let var21: GameUi = null;
        (var21 = new GameUi()).setText(Engine.getText(65619), 1, 0, 1, 0, 0);
        var21.setPortrait(16514);
        var21.field_207 = 2147483647;
        GameUi.queueMessage(var21);
        break;
      case 4:
        if (Game.scriptStep === 13) {
          let var13: GameUi = null;
          (var13 = new GameUi()).setPanTo(Level.randomBuildingOfType(14, 0));
          var13.setText(Engine.getText(65625), 1, 0, 1, 0, 0);
          var13.setPortrait(16514);
          GameUi.queueMessage(var13);
          (var13 = new GameUi()).setText(Engine.getText(65626), 1, 0, 1, 0, 0);
          var13.setPortrait(16514);
          GameUi.queueMessage(var13);
          (var13 = new GameUi()).setText(Engine.getText(65621), 1, 0, 1, 0, 0);
          var13.setPortrait(16512);
          GameUi.queueMessage(var13);
          Game.objectives.removeAllElements();
          let var16: Game = new Game().$init2(16384, 17, 7, null);
          Game.objectives.addElement(var16);
          let var17: Game = new Game().$init2(16384, 38, 4, null);
          Game.objectives.addElement(var17);
          let var18: Game = new Game().$init2(16384, 1, 6, null);
          Game.objectives.addElement(var18);
          let var19: Game = new Game().$init2(0, 245, 851969, null);
          Game.objectives.addElement(var19);
          let var20: Game = new Game().$init2(0, 244, 786434, null);
          Game.objectives.addElement(var20);
          Game.scriptStep = 14;
          GameData.setBuildingAllowed(4, true);
          GameData.setBuildingAllowed(6, true);
          GameData.setBuildingAllowed(7, true);
          GameData.setBuildingAllowed(11, true);
          Game.setMerchantSchedule(Game.day + 1, 3, 5, 1, 1);
          Game.setMerchantDemand(Int32Array.of(6, 65540, 655370, 131082, 262154, 458762, 393226, 196618, 720906, 524298, 589834));
          Game.setMerchantSupply(Int32Array.of(8, 65546, 655363, 131076, 262148, 458756, 393220, 196612, 720898, 524288, 589826));
          return;
        }
        if (Game.scriptStep === 14) {
          let var12: GameUi = null;
          (var12 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
          var12.setText(Engine.getText(65627), 1, 0, 1, 0, 0);
          var12.setPortrait(16514);
          var12.field_207 = 2147483647;
          GameUi.queueMessage(var12);
          return;
        }
        break;
      case 5:
        let var11: GameUi = null;
        (var11 = new GameUi()).setText(Engine.getText(65630), 1, 0, 1, 0, 0);
        var11.setPanDuration(200);
        var11.setPortrait(16514);
        var11.field_207 = 2147483647;
        GameUi.queueMessage(var11);
        break;
      case 6:
        let var10: GameUi = null;
        (var10 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var10.setText(Engine.getText(65634), 1, 0, 1, 0, 0);
        var10.setPortrait(16514);
        var10.field_207 = 2147483647;
        GameUi.queueMessage(var10);
        break;
      case 7:
        let var9: GameUi = null;
        (var9 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var9.setText(Engine.getText(65638), 1, 0, 1, 0, 0);
        var9.setPortrait(16514);
        var9.field_207 = 2147483647;
        GameUi.queueMessage(var9);
        break;
      case 8:
        let var8: GameUi = null;
        (var8 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var8.setText(Engine.getText(65641), 1, 0, 1, 0, 0);
        var8.setPortrait(16514);
        var8.field_207 = 2147483647;
        GameUi.queueMessage(var8);
        break;
      case 9:
        let var7: GameUi = null;
        (var7 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var7.setText(Engine.getText(65644), 1, 0, 1, 0, 0);
        var7.setPortrait(16514);
        var7.field_207 = 2147483647;
        GameUi.queueMessage(var7);
        break;
      case 10:
        let var6: GameUi = null;
        (var6 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var6.setText(Engine.getText(65647), 1, 0, 1, 0, 0);
        var6.setPortrait(16514);
        var6.field_207 = 2147483647;
        GameUi.queueMessage(var6);
        break;
      case 11:
        let var5: GameUi = null;
        (var5 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var5.setText(Engine.getText(65651), 1, 0, 1, 0, 0);
        var5.setPortrait(16514);
        var5.field_207 = 2147483647;
        GameUi.queueMessage(var5);
        break;
      case 12:
        let var4: GameUi = null;
        (var4 = new GameUi()).setPanTo(Building.mainBuilding);
        var4.setText(Engine.getText(65661), 1, 0, 1, 0, 0);
        var4.setPanDuration(200);
        var4.setPortrait(16514);
        var4.field_207 = 2147483647;
        GameUi.queueMessage(var4);
        break;
      case 13:
        let var3: GameUi = null;
        (var3 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var3.setText(Engine.getText(65665), 1, 0, 1, 0, 0);
        var3.setPortrait(16514);
        var3.field_207 = 2147483647;
        GameUi.queueMessage(var3);
        break;
      case 14:
        let var0: GameUi = null;
        (var0 = new GameUi()).setPanTo(Level.randomBuildingOfType(0, 0));
        var0.setText(Engine.getText(65668), 1, 0, 1, 0, 0);
        var0.setPortrait(16514);
        GameUi.queueMessage(var0);
        (var0 = new GameUi()).setText(Engine.getText(65669), 1, 0, 1, 0, 0);
        var0.setPortrait(16513);
        GameUi.queueMessage(var0);
        (var0 = new GameUi()).setText(Engine.getText(65670), 1, 0, 1, 0, 0);
        var0.setPortrait(16514);
        var0.field_207 = 2147483647;
        GameUi.queueMessage(var0);
    }
    if (Game.level.levelIndex === (-1)) {
      Game.finishLevel(true);
    }
  }
  static onLevelFailed(): void {
    switch (Game.level.levelIndex as number) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 13:
      default:
        break;
      case 5:
        let var3: GameUi = null;
        (var3 = new GameUi()).setText(Engine.getText(65631), 1, 0, 1, 0, 0);
        var3.setPanDuration(200);
        var3.setPortrait(16514);
        var3.field_207 = -2147483648;
        GameUi.queueMessage(var3);
        break;
      case 10:
        let var2: GameUi = null;
        (var2 = new GameUi()).setPanTo(Building.mainBuilding);
        var2.setText(Engine.getText(65648), 1, 0, 1, 0, 0);
        var2.setPortrait(16514);
        var2.setPanDuration(200);
        var2.field_207 = -2147483648;
        GameUi.queueMessage(var2);
        break;
      case 12:
        let var1: GameUi = null;
        (var1 = new GameUi()).setPanTo(Building.mainBuilding);
        var1.setText(Engine.getText(65662), 1, 0, 1, 0, 0);
        var1.setPortrait(16514);
        var1.setPanDuration(200);
        var1.field_207 = -2147483648;
        GameUi.queueMessage(var1);
        break;
      case 14:
        let var0: GameUi = null;
        (var0 = new GameUi()).setPanTo(Building.mainBuilding);
        var0.setText(Engine.getText(65671), 1, 0, 1, 0, 0);
        var0.setPanDuration(200);
        var0.setPortrait(16514);
        var0.field_207 = -2147483648;
        GameUi.queueMessage(var0);
    }
    if (Game.level.levelIndex === (-1)) {
      Game.finishLevel(false);
    }
  }
  static onMainBuildingCompleted(): void {
    switch (Game.level.levelIndex as number) {
      case 0:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131078, 1114114));
        Townsman.createMany(0, 3);
        Game.happiness = 75;
        let var69: Game = new Game().$init2(0, 254, 2, null);
        Game.objectives.addElement(var69);
        Game.scriptStep = 1;
        Game.missionTitleTextId = 65575;
        break;
      case 1:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65539, 2, 1114114));
        Townsman.createMany(0, 3);
        Game.happiness = 75;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setBuildingAllowed(5, true);
        GameData.setBuildingAllowed(2, true);
        GameData.setBuildingAllowed(8, true);
        GameData.setBuildingAllowed(3, true);
        GameData.setBuildingAllowed(9, true);
        GameData.setBuildingAllowed(10, true);
        let var66: GameUi = null;
        (var66 = new GameUi()).setPanTo(Level.randomBuildingOfType(12, 2));
        var66.setText(Engine.getText(65607), 1, 0, 1, 0, 0);
        var66.setPortrait(16514);
        GameUi.queueMessage(var66);
        (var66 = new GameUi()).setText(Engine.getText(65604), 1, 0, 1, 0, 0);
        var66.setPortrait(16512);
        var66.field_207 = 11;
        GameUi.queueMessage(var66);
        let var68: Game = new Game().$init2(8192, 180, 1, null);
        Game.objectives.addElement(var68);
        Game.scriptStep = 11;
        Game.missionTitleTextId = 65606;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 2:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(262148, 65538, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 75;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setBuildingAllowed(5, true);
        GameData.setBuildingAllowed(2, true);
        GameData.setBuildingAllowed(8, true);
        GameData.setBuildingAllowed(3, true);
        GameData.setBuildingAllowed(9, true);
        GameData.setBuildingAllowed(10, true);
        GameData.setBuildingAllowed(1, true);
        let var62: GameUi = null;
        (var62 = new GameUi()).setPanTo(Level.randomBuildingOfType(10, 2));
        var62.setText(Engine.getText(65613), 1, 0, 1, 0, 0);
        var62.setPortrait(16514);
        GameUi.queueMessage(var62);
        (var62 = new GameUi()).setText(Engine.getText(65609), 1, 0, 1, 0, 0);
        var62.setPortrait(16512);
        GameUi.queueMessage(var62);
        let var64: Game = new Game().$init2(24576, 32, 1, 2);
        Game.objectives.addElement(var64);
        let var65: Game = new Game().$init2(0, 247, 65554, null);
        Game.objectives.addElement(var65);
        Game.missionTitleTextId = 65611;
        Game.scriptStep = 9;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 3:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(262148, 65538, 2, 1114114));
        Townsman.createMany(0, 3);
        Game.happiness = 60;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setBuildingAllowed(5, true);
        GameData.setBuildingAllowed(2, true);
        GameData.setBuildingAllowed(8, true);
        GameData.setBuildingAllowed(3, true);
        GameData.setBuildingAllowed(9, true);
        GameData.setBuildingAllowed(10, true);
        GameData.setBuildingAllowed(1, true);
        let var54: GameUi = null;
        (var54 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 2));
        var54.setText(Engine.getText(65618), 1, 0, 1, 0, 0);
        var54.setPortrait(16514);
        GameUi.queueMessage(var54);
        let var55: Game = new Game().$init2(12288, 65560, 85, null);
        Game.objectives.addElement(var55);
        let var56: Game = new Game().$init2(16384, 32, 1, null);
        Game.objectives.addElement(var56);
        let var57: Game = new Game().$init2(0, 243, 262156, null);
        Game.objectives.addElement(var57);
        let var58: Game = new Game().$init2(0, 242, 196620, null);
        Game.objectives.addElement(var58);
        let var59: Game = new Game().$init2(0, 247, 65548, null);
        Game.objectives.addElement(var59);
        let var60: Game = new Game().$init2(0, 254, 12, null);
        Game.objectives.addElement(var60);
        Game.missionTitleTextId = 65617;
        Game.showLogbook();
        (var54 = new GameUi()).setText(Engine.getText(65616), 1, 0, 1, 0, 0);
        var54.setPortrait(16512);
        GameUi.queueMessage(var54);
        Game.gameSpeed = 1;
        break;
      case 4:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 75;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        GameData.setBuildingAllowed(12, false);
        GameData.setBuildingAllowed(4, false);
        GameData.setBuildingAllowed(6, false);
        GameData.setBuildingAllowed(7, false);
        GameData.setBuildingAllowed(11, false);
        let var50: GameUi = null;
        (var50 = new GameUi()).setPanTo(Building.mainBuilding);
        var50.setText(Engine.getText(65624), 1, 0, 1, 0, 0);
        var50.setPortrait(16514);
        GameUi.queueMessage(var50);
        let var51: Game = new Game().$init2(16384, 4, 14, null);
        Game.objectives.addElement(var51);
        let var52: Game = new Game().$init2(16384, 7, 13, null);
        Game.objectives.addElement(var52);
        Game.scriptStep = 13;
        Game.missionTitleTextId = 65622;
        Game.showLogbook();
        (var50 = new GameUi()).setPanTo(Level.randomBuildingOfType(10, 2));
        var50.setText(Engine.getText(65620), 1, 0, 1, 0, 0);
        var50.setPortrait(16512);
        var50.field_207 = 13;
        GameUi.queueMessage(var50);
        Game.gameSpeed = 1;
        break;
      case 5:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 393216, 196608, 655360, 458752, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 50;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setBuildingAllowed(5, true);
        GameData.setBuildingAllowed(2, true);
        GameData.setBuildingAllowed(8, true);
        GameData.setBuildingAllowed(3, true);
        GameData.setBuildingAllowed(9, true);
        GameData.setBuildingAllowed(10, true);
        GameData.setBuildingAllowed(1, true);
        let var45: GameUi = null;
        (var45 = new GameUi()).setPanTo(Building.mainBuilding);
        var45.setText(Engine.getText(65629), 1, 0, 1, 0, 0);
        var45.setPortrait(16514);
        GameUi.queueMessage(var45);
        let var46: Game = new Game().$init2(24576, 32, 1, 2);
        Game.objectives.addElement(var46);
        let var47: Game = new Game().$init2(0, 243, 262164, null);
        Game.objectives.addElement(var47);
        let var48: Game = new Game().$init2(12288, 65560, 80, null);
        Game.objectives.addElement(var48);
        let var49: Game = new Game().$init2(53248, 65563, 20, null);
        Game.constraints.addElement(var49);
        Game.missionTitleTextId = 65628;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 6:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 393216, 196608, 655360, 458752, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 70;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        GameData.setBuildingAllowed(14, false);
        let var43: GameUi = null;
        (var43 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 1));
        var43.setText(Engine.getText(65633), 1, 0, 1, 0, 0);
        var43.setPortrait(16514);
        var43.field_207 = 12;
        GameUi.queueMessage(var43);
        let var44: Game = new Game().$init2(36864, 65556, 4, null);
        Game.objectives.addElement(var44);
        Game.missionTitleTextId = 65632;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 7:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 393216, 196608, 655360, 458752, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 70;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        let var41: GameUi = null;
        (var41 = new GameUi()).setPanTo(Level.randomBuildingOfType(14, 1));
        var41.setText(Engine.getText(65637), 1, 0, 1, 0, 0);
        var41.setPortrait(16514);
        var41.field_207 = 15;
        GameUi.queueMessage(var41);
        let var42: Game = new Game().$init2(36864, 65556, 6, null);
        Game.objectives.addElement(var42);
        Game.missionTitleTextId = 65636;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 8:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 75;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        let var28: GameUi = null;
        (var28 = new GameUi()).setText(Engine.getText(65640), 1, 0, 1, 0, 0);
        var28.setPortrait(16514);
        GameUi.queueMessage(var28);
        let var29: Game = new Game().$init2(8192, 180, Game.maxResearchLevel, null);
        Game.objectives.addElement(var29);
        let var30: Game = new Game().$init2(16384, 15, 8, 1);
        Game.objectives.addElement(var30);
        let var31: Game = new Game().$init2(16384, 40, 9, 1);
        Game.objectives.addElement(var31);
        let var32: Game = new Game().$init2(16384, 11, 5, 1);
        Game.objectives.addElement(var32);
        let var33: Game = new Game().$init2(16384, 26, 10, 1);
        Game.objectives.addElement(var33);
        let var34: Game = new Game().$init2(16384, 36, 2, 1);
        Game.objectives.addElement(var34);
        let var35: Game = new Game().$init2(16384, 21, 3, 1);
        Game.objectives.addElement(var35);
        let var36: Game = new Game().$init2(16384, 2, 6, 1);
        Game.objectives.addElement(var36);
        let var37: Game = new Game().$init2(16384, 18, 7, 1);
        Game.objectives.addElement(var37);
        let var38: Game = new Game().$init2(16384, 33, 1, 1);
        Game.objectives.addElement(var38);
        let var39: Game = new Game().$init2(16384, 5, 14, 1);
        Game.objectives.addElement(var39);
        let var40: Game = new Game().$init2(16384, 8, 13, 1);
        Game.objectives.addElement(var40);
        Game.missionTitleTextId = 65639;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 9:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 70;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        let var25: GameUi = null;
        (var25 = new GameUi()).setPanTo(Building.mainBuilding);
        var25.setText(Engine.getText(65643), 1, 0, 1, 0, 0);
        var25.setPortrait(16514);
        GameUi.queueMessage(var25);
        let var26: Game = new Game().$init2(0, 247, 65566, null);
        Game.objectives.addElement(var26);
        let var27: Game = new Game().$init2(0, 246, 524318, null);
        Game.objectives.addElement(var27);
        Game.missionTitleTextId = 65642;
        Game.gameSpeed = 1;
        Game.showLogbook();
        break;
      case 10:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 2, 196608, 655360, 458752, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 90;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        let var22: GameUi = null;
        (var22 = new GameUi()).setPanTo(Level.randomBuildingOfType(8, 2));
        var22.setText(Engine.getText(65646), 1, 0, 1, 0, 0);
        var22.setPortrait(16514);
        GameUi.queueMessage(var22);
        let var23: Game = new Game().$init2(0, 239, 131112, null);
        Game.objectives.addElement(var23);
        let var24: Game = new Game().$init2(53248, 65563, 25, null);
        Game.constraints.addElement(var24);
        Game.missionTitleTextId = 65645;
        Game.gameSpeed = 1;
        Game.showLogbook();
        break;
      case 11:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131078, 65542, 4, 262146, 655362, 458754, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 60;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        GameData.setBuildingAllowed(5, false);
        let var19: GameUi = null;
        (var19 = new GameUi()).setPanTo(Level.randomBuildingOfType(14, 1));
        var19.setText(Engine.getText(65650), 1, 0, 1, 0, 0);
        var19.setPortrait(16514);
        GameUi.queueMessage(var19);
        let var20: Game = new Game().$init2(45056, 65558, 0, null);
        Game.objectives.addElement(var20);
        Game.missionTitleTextId = 65649;
        Game.showLogbook();
        (var19 = new GameUi()).setPanTo(Building.mainBuilding);
        GameUi.queueMessage(var19);
        Game.gameSpeed = 1;
        break;
      case 12:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 393216, 196608, 655360, 458752, 1114116));
        Townsman.createMany(0, 3);
        Game.happiness = 70;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        GameData.setBuildingAllowed(10, false);
        let var8: GameUi = null;
        (var8 = new GameUi()).setPanTo(Level.randomBuildingOfType(14, 1));
        var8.setText(Engine.getText(65653), 1, 0, 1, 0, 0);
        var8.setPortrait(16515);
        var8.setPanDuration(0);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setPanFrom(Building.mainBuilding);
        var8.setPanTo(Building.mainBuilding);
        var8.setText(Engine.getText(65654), 1, 0, 1, 0, 0);
        var8.setPortrait(16514);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setText(Engine.getText(65655), 1, 0, 1, 0, 0);
        var8.setPortrait(16513);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setPanFrom(Level.randomBuildingOfType(14, 1));
        var8.setPanTo(Level.randomBuildingOfType(14, 1));
        var8.setText(Engine.getText(65656), 1, 0, 1, 0, 0);
        var8.setPortrait(16515);
        var8.setPanDuration(0);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setPanFrom(Building.mainBuilding);
        var8.setPanTo(Building.mainBuilding);
        var8.setText(Engine.getText(65657), 1, 0, 1, 0, 0);
        var8.setPortrait(16514);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setText(Engine.getText(65658), 1, 0, 1, 0, 0);
        var8.setPortrait(16513);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setText(Engine.getText(65659), 1, 0, 1, 0, 0);
        var8.setPortrait(16514);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setPanFrom(Level.randomBuildingOfType(14, 1));
        var8.setPanTo(Level.randomBuildingOfType(14, 1));
        var8.setText(Engine.getText(65660), 1, 0, 1, 0, 0);
        var8.setPortrait(16515);
        var8.setPanDuration(0);
        GameUi.queueMessage(var8);
        (var8 = new GameUi()).setPanTo(Building.mainBuilding);
        var8.setPanDuration(0);
        GameUi.queueMessage(var8);
        let var17: Game = new Game().$init2(40960, 65557, 5, null);
        Game.constraints.addElement(var17);
        let var18: Game = new Game().$init2(49152, 65563, 50, null);
        Game.objectives.addElement(var18);
        Game.missionTitleTextId = 65652;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 13:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 393216, 196608, 655360, 458752, 1114132));
        Townsman.createMany(0, 3);
        Game.happiness = 65;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        let var5: GameUi = null;
        (var5 = new GameUi()).setPanTo(Level.randomBuildingOfType(3, 1));
        var5.setText(Engine.getText(65664), 1, 0, 1, 0, 0);
        var5.setPortrait(16514);
        GameUi.queueMessage(var5);
        let var6: Game = new Game().$init2(45056, 65558, 0, null);
        Game.objectives.addElement(var6);
        let var7: Game = new Game().$init2(12288, 65560, 90, null);
        Game.objectives.addElement(var7);
        Game.missionTitleTextId = 65663;
        Game.showLogbook();
        Game.gameSpeed = 1;
        break;
      case 14:
        Game.storageCapacity = 10;
        Game.setStocks(Int32Array.of(131076, 65538, 393216, 196608, 655360, 458752, 1114122));
        Townsman.createMany(0, 3);
        Game.happiness = 75;
        Game.applyDepartmentBonuses(Game.level.levelIndex);
        GameData.setAllBuildingsAllowed(true);
        let var0: GameUi = null;
        (var0 = new GameUi()).setPanTo(Building.mainBuilding);
        var0.setText(Engine.getText(65667), 1, 0, 1, 0, 0);
        var0.setPortrait(16514);
        GameUi.queueMessage(var0);
        let var1: Game = new Game().$init2(0, 241, 1114312, null);
        Game.objectives.addElement(var1);
        let var2: Game = new Game().$init2(0, 246, 524318, null);
        Game.objectives.addElement(var2);
        let var3: Game = new Game().$init2(0, 248, 655385, null);
        Game.objectives.addElement(var3);
        let var4: Game = new Game().$init2(53248, 65563, 30, null);
        Game.constraints.addElement(var4);
        Game.missionTitleTextId = 65666;
        Game.showLogbook();
        Game.gameSpeed = 1;
    }
    if (Game.level.levelIndex === (-1)) {
      Game.storageCapacity = 10;
      Game.researchLevel = 0;
      Game.maxResearchLevel = GameData.researchPointsPerLevel.length;
      Game.setStocks(Int32Array.of(5, 65540, 262148, 131077, 524291, 655362, 1114117));
      Game.clampStocks();
      Game.happiness = 80;
      Townsman.createMany(0, 3);
    }
    Townsman.createMany(2, Game.getDepartmentTroops(Game.level.levelIndex, true));
  }
  static onNewDay(): void {
    if (Game.weather === 1) {
      GameData.showTipOnce(10);
    }
    if (Game.weather === 2) {
      GameData.showTipOnce(11);
    }
    if (Game.happiness < 30) {
      GameData.showTipOnce(5);
    }
    if (Game.happiness > 90) {
      GameData.showTipOnce(6);
    }
    switch (Game.level.levelIndex as number) {
      case 0:
        if (Game.happiness < 50) {
          Game.happiness = 50;
        }
        if (Game.day === 1) {
          let var0: GameUi = null;
          (var0 = new GameUi()).setTextWithSubstitutions(Engine.getText(262144), Int32Array.of(1, -1, -1, 1, 0, 0, 0), Int32Array.of(1, -1, -1, 1, 0, Engine.getColor(30), Engine.getColor(30)), Engine.getKeyNames());
          var0.setPortrait(16512);
          GameUi.queueMessage(var0);
        }
        if (Game.day === 2) {
          let var1: GameUi = null;
          (var1 = new GameUi()).setText(Engine.getText(262147), 1, 0, 1, 0, 0);
          var1.setPortrait(16512);
          GameUi.queueMessage(var1);
        }
        if (Game.day === 3) {
          let var2: GameUi = null;
          (var2 = new GameUi()).setText(Engine.getText(262145), 1, 0, 1, 0, 0);
          var2.setPortrait(16512);
          GameUi.queueMessage(var2);
          return;
        }
        break;
      case 1:
        if (Game.getStock(720896) > 0 && Game.getStock(1114112) > 4) {
          GameData.showTipOnce(7);
          return;
        }
        break;
      case 7:
        if (Game.day % 5 === 0) {
          Engine.recruitAiTownsmen();
          return;
        }
        break;
      case 12:
        if (Game.day === 20) {
          Engine.configureAi(10, 5, 100, 1, 5, 80, 4, 15);
          Game.setMerchantDemand(Int32Array.of(25, 65576, 655370, 131097, 262169, 458792, 393246, 196633, 720936, 524308, 589834));
        }
        if (Game.day === 30) {
          Engine.configureAi(10, 4, 125, 2, 6, 90, 5, 15);
          Game.setMerchantDemand(Int32Array.of(30, 65576, 655370, 131102, 262174, 458792, 393246, 196638, 720936, 524308, 589834));
        }
        if (Game.day === 40) {
          Engine.configureAi(10, 3, 150, 3, 7, 100, 6, 15);
          Game.setMerchantDemand(Int32Array.of(40, 65576, 655370, 131112, 262184, 458792, 393246, 196648, 720936, 524308, 589834));
        }
    }
  }
  static method_552(var0: Townsman): void {
    switch (Game.level.levelIndex as number) {
      case 6:
        if (var0.kind === 2) {
          let var1: GameUi = null;
          (var1 = new GameUi()).setText(Engine.getText(65635), 1, 0, 1, 0, 0);
          var1.setPortrait(16514);
          var1.setPanDuration(200);
          var1.field_207 = -2147483648;
          GameUi.queueMessage(var1);
        }
    }
  }
  static showUnderAttackMessage(var0: Building): void {
    let var1: GameUi = null;
    (var1 = new GameUi()).setPanTo(var0);
    var1.setText(Engine.getText(59), 1, 0, 1, 0, 0);
    var1.setPortrait(16512);
    GameUi.queueMessage(var1);
  }
  static showVictoryMessage(var0: Building, var1: boolean): void {
    if (var1) {
      let var3: GameUi = null;
      (var3 = new GameUi()).setPanTo(var0);
      var3.setText(Engine.getText(62), 1, 0, 1, 0, 0);
      var3.setPortrait(16512);
      GameUi.queueMessage(var3);
    } else {
      let var2: GameUi = null;
      (var2 = new GameUi()).setPanTo(var0);
      var2.setText(Engine.getText(65), 1, 0, 1, 0, 0);
      var2.setPortrait(16512);
      GameUi.queueMessage(var2);
    }
  }
  static showDefeatMessage(var0: Building, var1: boolean): void {
    if (var1) {
      let var3: GameUi = null;
      (var3 = new GameUi()).setPanTo(var0);
      var3.setText(Engine.getText(58), 1, 0, 1, 0, 0);
      var3.setPortrait(16512);
      GameUi.queueMessage(var3);
    } else {
      let var2: GameUi = null;
      (var2 = new GameUi()).setPanTo(var0);
      var2.setText(Engine.getText(64), 1, 0, 1, 0, 0);
      var2.setPortrait(16512);
      GameUi.queueMessage(var2);
    }
  }
  static onMessageClosed(var0: GameUi): void {
    switch (var0.field_207 as number) {
      case -2147483648:
        Game.finishLevel(false);
        return;
      case 1:
        GameData.levelAnchorBuilding.showAlertIcon(0);
        break;
      case 11:
        Level.randomBuildingOfType(12, 0).showAlertIcon(0);
        break;
      case 12:
        Level.randomBuildingOfType(3, 1).showAlertIcon(16);
        Level.randomBuildingOfType(10, 1).showAlertIcon(16);
        Level.randomBuildingOfType(5, 1).showAlertIcon(16);
        Level.randomBuildingOfType(6, 1).showAlertIcon(16);
        break;
      case 13:
        Level.randomBuildingOfType(10, 0).showAlertIcon(0);
        break;
      case 15:
        Level.randomBuildingOfType(3, 1).showAlertIcon(16);
        Level.randomBuildingOfType(2, 1).showAlertIcon(16);
        Level.randomBuildingOfType(5, 1).showAlertIcon(16);
        Level.randomBuildingOfType(7, 1).showAlertIcon(16);
        Level.randomBuildingOfType(8, 1).showAlertIcon(16);
        Level.randomBuildingOfType(14, 1).showAlertIcon(16);
        break;
      case 50:
        GameUi.setState(3);
        return;
      case 100:
        GameUi.setState(25);
        return;
      case 2147483647:
        Game.finishLevel(true);
        return;
    }
    GameUi.setState(0);
  }
  static placeInitialSettlements(): void {
    let var0: Level = Game.level;
    switch (Game.level.levelIndex as number) {
      case 0:
        GameData.levelAnchorBuilding = Building.create(9, 0, 0);
        var0.placeRandomlyNearPoint(GameData.levelAnchorBuilding, 50, idiv(Game.level.width, 2), idiv(Game.level.height, 2));
        var0.placeRandomlyNear(Building.create(0, 0, 0), 8, GameData.levelAnchorBuilding);
        break;
      case 1:
        GameData.levelAnchorBuilding = Building.create(8, 0, 2);
        var0.placeRandomlyNearPoint(GameData.levelAnchorBuilding, 50, idiv(Game.level.width, 2), idiv(Game.level.height, 2));
        var0.placeRandomlyNear(Building.create(12, 0, 2), 10, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 30, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(9, 0, 2), 30, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 0, 2), 30, GameData.levelAnchorBuilding);
        break;
      case 2:
        GameData.levelAnchorBuilding = Building.create(10, 0, 2);
        var0.placeRandomlyNearPoint(GameData.levelAnchorBuilding, 50, idiv(Game.level.width, 2), idiv(Game.level.height, 2));
        var0.placeRandomlyNear(Building.create(8, 0, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 30, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(9, 0, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 0, 2), 40, GameData.levelAnchorBuilding);
        break;
      case 3:
        GameData.levelAnchorBuilding = Building.create(3, 0, 2);
        var0.placeRandomlyNearPoint(GameData.levelAnchorBuilding, 50, idiv(Game.level.width, 2), idiv(Game.level.height, 2));
        var0.placeRandomlyNear(Building.create(9, 0, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 0, 2), 50, GameData.levelAnchorBuilding);
        break;
      case 4:
        GameData.levelAnchorBuilding = Building.create(10, 1, 2);
        var0.placeRandomly(GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(8, 0, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 0, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(9, 0, 2), 40, GameData.levelAnchorBuilding);
        break;
      case 5:
        GameData.levelAnchorBuilding = Building.create(10, 0, 2);
        var0.placeRandomly(GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(9, 0, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 30, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 30, GameData.levelAnchorBuilding);
        break;
      case 6:
        GameData.levelAnchorBuilding = Building.create(9, 0, 2);
        var0.placeRandomlyNearPoint(GameData.levelAnchorBuilding, 50, Game.level.width, idiv(Game.level.height, 2));
        var0.placeRandomlyNear(Building.create(3, 0, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 0, 2), 40, GameData.levelAnchorBuilding);
        GameData.enemyAnchorBuilding = Building.create(10, 0, 1);
        var0.placeRandomlyNear(GameData.enemyAnchorBuilding, -40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 1), 30, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(5, 0, 1), 30, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(6, 0, 1), 30, GameData.enemyAnchorBuilding);
        break;
      case 7:
        GameData.levelAnchorBuilding = Building.create(10, 0, 2);
        var0.placeRandomly(GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(8, 1, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 1, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 1, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(9, 0, 2), 50, GameData.levelAnchorBuilding);
        GameData.enemyAnchorBuilding = Building.create(3, 0, 1);
        var0.placeRandomlyNear(GameData.enemyAnchorBuilding, -70, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(7, 0, 1), 50, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(5, 0, 1), 50, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 0, 1), 50, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(8, 0, 1), 50, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(14, 2, 1), 50, GameData.enemyAnchorBuilding);
        Engine.configureAi(-1, 10, 50, 1, 5, 0, 1, 0);
        Engine.setupAiSettlement(GameData.enemyAnchorBuilding, 40);
        break;
      case 8:
        Engine.configureAi(10, 6, 70, 1, 5, 20, 1, 0);
        Engine.setupAiSettlementDefault();
        break;
      case 9:
        Engine.configureAi(14, 5, 80, 1, 5, 40, 1, 0);
        Engine.setupAiSettlementDefault();
        break;
      case 10:
        GameData.levelAnchorBuilding = Building.create(8, 0, 2);
        var0.placeRandomly(GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 1, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 1, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 40, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(8, 0, 2), 40, GameData.levelAnchorBuilding);
        Engine.configureAi(10, 5, 60, 1, 5, 30, 1, 1);
        Engine.setupAiSettlement(GameData.levelAnchorBuilding, -40);
        break;
      case 11:
        GameData.enemyAnchorBuilding = Building.create(10, 0, 1);
        var0.placeRandomlyNearPoint(GameData.enemyAnchorBuilding, 50, Game.level.width, Game.level.height);
        var0.placeRandomlyNear(Building.create(8, 1, 1), 40, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(5, 1, 1), 40, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 1, 1), 40, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(9, 1, 1), 40, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 1, 1), 40, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(6, 1, 1), 40, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(4, 0, 1), 40, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(7, 1, 1), 40, GameData.enemyAnchorBuilding);
        Engine.configureAi(12, 6, 100, 2, 4, 80, 2, 12);
        Engine.setupAiSettlement(GameData.enemyAnchorBuilding, 40);
        Engine.addAiTargetType(3, 20);
        Engine.addAiTargetType(9, 10);
        Engine.addAiTargetType(10, 10);
        break;
      case 12:
        GameData.levelAnchorBuilding = Building.createScenarioBuilding(8);
        var0.placeRandomly(GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.createScenarioBuilding(9), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.createScenarioBuilding(3), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.createScenarioBuilding(2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.createScenarioBuilding(14), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(5, 0, 2), 50, GameData.levelAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 0, 2), 50, GameData.levelAnchorBuilding);
        GameData.enemyAnchorBuilding = Building.create(14, 2, 1);
        var0.placeRandomlyNear(GameData.enemyAnchorBuilding, -40, GameData.levelAnchorBuilding);
        Engine.configureAi(10, 5, 100, 1, 4, 70, 3, 15);
        Engine.setupAiSettlement(GameData.enemyAnchorBuilding, 40);
        break;
      case 13:
        GameData.enemyAnchorBuilding = Building.create(10, 2, 1);
        var0.placeRandomly(GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(3, 2, 1), 10, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(2, 2, 1), 10, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(8, 2, 1), 10, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(9, 2, 1), 10, GameData.enemyAnchorBuilding);
        var0.placeRandomlyNear(Building.create(5, 2, 1), 10, GameData.enemyAnchorBuilding);
        Engine.configureAi(13, 5, 200, 1, 6, 70, 3, 15);
        Engine.setupAiSettlement(GameData.enemyAnchorBuilding, 40);
        break;
      case 14:
        Engine.configureAi(15, 5, 100, 1, 5, 70, 1, 3);
        Engine.setupAiSettlementDefault();
    }
    if (Game.level.levelIndex === (-1)) {
      switch (Level.openEndEnemy as number) {
        case 0:
          return;
        case 1:
          Engine.configureAi(-1, 0, 40, 1, 4, 0, 1, 4);
          Engine.setupAiSettlementDefault();
          return;
        case 2:
          Engine.configureAi(15, 5, 100, 2, 5, 50, 2, 8);
          Engine.setupAiSettlementDefault();
          return;
        case 3:
          Engine.configureAi(15, 3, 200, 3, 7, 75, 5, 15);
          Engine.setupAiSettlementDefault();
          return;
        default:
          throw new IllegalArgumentException("Level.openEndAI is invalid.");
      }
    }
  }
  static method_558(): IntList {
    let var0: IntList = new IntList().$init1(21);
    switch (Game.level.levelIndex as number) {
      case 0:
        var0.add(131072);
        var0.add(262144);
        var0.add(0);
        var0.add(65536);
        var0.add(196608);
        return var0;
      case 1:
        var0.add(131072);
        var0.add(262144);
        var0.add(0);
        var0.add(65536);
        var0.add(196608);
        var0.add(720896);
        return var0;
      case 2:
        var0.add(131072);
        var0.add(262144);
        var0.add(0);
        var0.add(65536);
        var0.add(196608);
        var0.add(393216);
        var0.add(458752);
        return var0;
      case 3:
        var0.add(131072);
        var0.add(262144);
        var0.add(0);
        var0.add(65536);
        var0.add(196608);
        return var0;
      default:
        var0.add(131072);
        var0.add(262144);
        var0.add(0);
        var0.add(65536);
        var0.add(524288);
        var0.add(196608);
        var0.add(393216);
        var0.add(458752);
        var0.add(655360);
        var0.add(589824);
        var0.add(720896);
        return var0;
    }
  }
  static method_559(): IntList {
    let var0: IntList = new IntList().$init1(21);
    Game.setMerchantPrices(Int32Array.of(1, 65539, 655368, 131073, 262146, 458760, 393220, 196610, 720906, 524292, 589834));
    var0.add(131072);
    var0.add(262144);
    var0.add(0);
    var0.add(65536);
    var0.add(524288);
    var0.add(196608);
    var0.add(393216);
    var0.add(458752);
    var0.add(655360);
    var0.add(589824);
    var0.add(720896);
    return var0;
  }
  static showTipOnce(var0: number): void {
    if (!Game.level.restoringSave && Game.level.levelStarted) {
      if (!GameData.tipShown[var0]) {
        GameData.tipShown[var0] = true;
        switch (var0) {
          case 0:
            let var12: GameUi = null;
            (var12 = new GameUi()).setText(Engine.getText(262162), 1, 0, 1, 0, 0);
            var12.setPortrait(16514);
            GameUi.queueMessage(var12);
            let var13: GameUi = null;
            (var13 = new GameUi()).setText(Engine.getText(262152), 1, 0, 1, 0, 0);
            var13.setPortrait(16512);
            GameUi.queueMessage(var13);
            let var14: GameUi = null;
            (var14 = new GameUi()).setText(Engine.getText(262159), 1, 0, 1, 0, 0);
            var14.setPortrait(16512);
            var14.field_207 = 100;
            GameUi.queueMessage(var14);
            return;
          case 1:
            let var11: GameUi = null;
            (var11 = new GameUi()).setPanTo(Level.randomBuildingOfType(1, 0));
            var11.setText(Engine.getText(262153), 1, 0, 1, 0, 0);
            var11.setPortrait(16512);
            GameUi.queueMessage(var11);
            return;
          case 2:
            let var10: GameUi = null;
            (var10 = new GameUi()).setPanTo(Level.randomBuildingOfType(11, 0));
            var10.setText(Engine.getText(262154), 1, 0, 1, 0, 0);
            var10.setPortrait(16512);
            GameUi.queueMessage(var10);
            return;
          case 3:
            let var9: GameUi = null;
            (var9 = new GameUi()).setPanTo(Building.mainBuilding);
            var9.setText(Engine.getText(262155), 1, 0, 1, 0, 0);
            var9.setPortrait(16512);
            GameUi.queueMessage(var9);
            return;
          case 4:
            let var8: GameUi = null;
            (var8 = new GameUi()).setPanTo(Level.randomBuildingOfType(2, 1));
            var8.setText(Engine.getText(262156), 1, 0, 1, 0, 0);
            var8.setPortrait(16512);
            GameUi.queueMessage(var8);
            return;
          case 5:
            let var7: GameUi = null;
            (var7 = new GameUi()).setText(Engine.getText(262149), 1, 0, 1, 0, 0);
            var7.setPortrait(16514);
            var7.setPanDuration(200);
            GameUi.queueMessage(var7);
            return;
          case 6:
            let var6: GameUi = null;
            (var6 = new GameUi()).setText(Engine.getText(262148), 1, 0, 1, 0, 0);
            var6.setPortrait(16514);
            var6.setPanDuration(200);
            GameUi.queueMessage(var6);
            return;
          case 7:
            let var5: GameUi = null;
            (var5 = new GameUi()).setPanTo(Level.randomBuildingOfType(12, 0));
            var5.setText(Engine.getText(65605), 1, 0, 1, 0, 0);
            var5.setPortrait(16512);
            var5.field_207 = 11;
            GameUi.queueMessage(var5);
            return;
          case 8:
            let var4: GameUi = null;
            (var4 = new GameUi()).setPanTo(Level.randomBuildingOfType(14, 0));
            var4.setText(Engine.getText(262150), 1, 0, 1, 0, 0);
            var4.setPortrait(16512);
            GameUi.queueMessage(var4);
            return;
          case 9:
            let var3: GameUi = null;
            (var3 = new GameUi()).setPanTo(Level.randomBuildingOfType(13, 0));
            var3.setText(Engine.getText(262151), 1, 0, 1, 0, 0);
            var3.setPortrait(16512);
            GameUi.queueMessage(var3);
            return;
          case 10:
            let var2: GameUi = null;
            (var2 = new GameUi()).setText(Engine.getText(262157), 1, 0, 1, 0, 0);
            var2.setPortrait(16512);
            GameUi.queueMessage(var2);
            return;
          case 11:
            let var1: GameUi = null;
            (var1 = new GameUi()).setText(Engine.getText(262158), 1, 0, 1, 0, 0);
            var1.setPortrait(16512);
            GameUi.queueMessage(var1);
        }
      }
    }
  }
  static cheatPlaceAllBuildings(var0: boolean): void {
    for (let var1: number = Building.mainBuilding === null ? 0 : 1; var1 < 15; var1++) {
      for (let var2: number = 0; var2 < GameData.buildingLimits[var1][2]; var2++) {
        let var3: number = 0;
        if (var0) {
          var3 = Engine.randomRange(0, GameData.getMaxLevel(var1));
        } else {
          var3 = GameData.getMaxLevel(var1);
        }
        if (var1 === 5) {
          let var4: Building = Building.createConstructionSite(var1, var3, 1, false);
          Game.level.placeRandomly(var4);
          if (var4.isFullyOnMap()) {
            var4.setOwner(0);
          }
        } else {
          Game.level.placeRandomly(Building.createConstructionSite(var1, var3, 0, false));
        }
      }
    }
  }
}
