import { stringSwapTest } from "./utils";


describe("Корректно разворачивает строку", () => {
  let cat; // с нечетным количеством символов
  let dog; // с чётным количеством символов

  beforeEach(() => {
    cat = ["а", "к", "ш", "о", "к"]; 
    dog = ["а", "к", "а", "б", "о", "с"];
  })

  test("с чётным количеством символов", () => {
    expect(stringSwapTest("собака")).toEqual(dog);
  })

  test("с нечетным количеством символов", () => {
    expect(stringSwapTest("кошка")).toEqual(cat);
  })

  test("с одним символом", () => {
    expect(stringSwapTest("a")).toEqual(["a"]);
  })

  test("пустую строку", () => {
    expect(stringSwapTest("")).toEqual([]);
  })
})