import { DELAY_IN_MS } from "../../src/constants/delays";
import { loader } from "../constants";

describe("Тестирование алгоритма - Последовательность Фибоначчи", () => {
  const fibonacciNumbers = [1, 1, 2, 3, 5, 8, 13, 21, 34];

  beforeEach(() => {
    cy.visit("/fibonacci");
    cy.get("button").last().as("button");
    cy.get("input").as("input");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {    
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Числа генерируются корректно", () => {
    cy.get("@input").type("8");
    cy.get("@button").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);

    cy.get("@button").click();
    cy.get("@button")
      .invoke("attr", "class")
      .then((className) => expect(className).contains(loader));

    for (let i = 0; i < 8; i++) {
      cy.get(`[class^="circle_circle"]:eq(${i})`)
        .invoke("text")
        .should("eq", fibonacciNumbers[i].toString());
    }
  });
});
