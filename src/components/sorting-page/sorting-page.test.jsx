import { Direction } from "../../types/direction";
import { bubbleSortTest, selectionSortTest } from "./utils";

let emptyArray; // пустой массив
let oneElementArray; // массив из одного элемента
let manyElementsArray; // массив из нескольких элементов

describe("Тестирование алгоритмов сортировки пузырьком:", () => {

  beforeEach(() => {
    emptyArray = [];
    oneElementArray = [25];
    manyElementsArray = [1, 5, 10, 15, 20, 25, 30];
  })

  test("Корректно сортирует пустой массив по возрастанию", () => {
    expect(bubbleSortTest(emptyArray, Direction.Ascending)).toEqual(emptyArray);
  });

  test("Корректно сортирует пустой массив по убыванию", () => {
    expect(bubbleSortTest(emptyArray, Direction.Descending)).toEqual(emptyArray);
  });

  test("Корректно сортирует массив из одного элемента по возрастанию", () => {
    expect(bubbleSortTest(oneElementArray, Direction.Ascending)).toEqual(oneElementArray);
  });

  test("Корректно сортирует массив из одного элемента по убыванию", () => {
    expect(bubbleSortTest(oneElementArray, Direction.Descending)).toEqual(oneElementArray);
  });

  test("Корректно сортирует массив из нескольких элементов по возрастанию", () => {
    expect(bubbleSortTest(manyElementsArray, Direction.Ascending)).toEqual(manyElementsArray);
  });

  test("Корректно сортирует массив из нескольких элементов по убыванию", () => {
    expect(bubbleSortTest(manyElementsArray, Direction.Descending)).toEqual(manyElementsArray);
  });
});


describe("Тестирование алгоритмов сортировки выбором:", () => {

  beforeEach(() => {
    emptyArray = [];
    oneElementArray = [25];
    manyElementsArray = [1, 5, 10, 15, 20, 25, 30];
  })
  
  test("Корректно сортирует пустой массив по возрастанию", () => {
    expect(selectionSortTest(emptyArray, Direction.Ascending)).toEqual(emptyArray);
  });

  test("Корректно сортирует пустой массив по убыванию", () => {
    expect(selectionSortTest(emptyArray, Direction.Descending)).toEqual(emptyArray);
  });

  test("Корректно сортирует массив из одного элемента по возрастанию", () => {
    expect(selectionSortTest(oneElementArray, Direction.Ascending)).toEqual(oneElementArray);
  });

  test("Корректно сортирует массив из одного элемента по убыванию", () => {
    expect(selectionSortTest(oneElementArray, Direction.Descending)).toEqual(oneElementArray);
  });

  test("Корректно сортирует массив из нескольких элементов по возрастанию", () => {
    expect(selectionSortTest(manyElementsArray, Direction.Ascending)).toEqual(manyElementsArray);
  });

  test("Корректно сортирует массив из нескольких элементов по убыванию", () => {
    expect(selectionSortTest(manyElementsArray, Direction.Descending)).toEqual(manyElementsArray);
  });
});
