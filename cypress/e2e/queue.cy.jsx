import { DELAY_IN_MS } from "../../src/constants/delays";
import { circle, circleChanging, circleContent, circleDefault, loader } from "../constants";

const array = [200, 300, 400];
const push = (value) => {
  cy.get("input").type(value);
  cy.get("@addButton").should("not.be.disabled");
  cy.get("@addButton").click();
  cy.get("@deleteButton").should("not.be.disabled");
};

describe("Тестирование алгоритма - Очередь", () => {
  beforeEach(() => {
    cy.visit("/queue");
    cy.get("button[id='addButton']").as("addButton");
    cy.get("button[id='deleteButton']").as("deleteButton");
    cy.get("button[id='clearButton']").as("clearButton");
    cy.get("input").as("input");
    cy.get(circle).as("circle");
    cy.get(circleContent).as("circleContent");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").should("have.value", "");

    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("Правильность добавления элемента в очередь", () => {
    cy.get("@input").type("50");
    cy.get("@addButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@addButton").click();
    cy.get("@addButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(loader));
    cy.get("@circle")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(circleChanging));

    cy.wait(DELAY_IN_MS);
    cy.get("@circle")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(circleDefault));
    cy.get("@circleContent").then((item) => {
      cy.get(item[0])
        .children("div")
        .invoke("first")
        .should("have.text", "head");
      cy.get(item[0])
        .children("div")
        .invoke("last")
        .should("have.text", "tail");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@input").type("60");
    cy.get("@addButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@addButton").click();
    cy.get("@addButton")
      .invoke("attr", "class")
      .then((className) => expect(className).contains(loader));
    cy.get("@circle").then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(circleDefault));
    cy.get("@circleContent").then((item) => {
      cy.get(item[0])
        .children("div")
        .invoke("first")
        .should("have.text", "head");
      cy.get(item[1])
        .children("div")
        .invoke("last")
        .should("have.text", "tail");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@input").type("70");
    cy.get("@addButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@addButton").click();
    cy.get("@addButton")
      .invoke("attr", "class")
      .then((className) => expect(className).contains(loader));
    cy.get("@circle").then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(circleDefault));
    cy.get("@circleContent").then((item) => {
      cy.get(item[0])
        .children("div")
        .invoke("first")
        .should("have.text", "head");
      cy.get(item[2])
        .children("div")
        .invoke("last")
        .should("have.text", "tail");
    });
  });

  it("Правильность добавления элемента из очереди", () => {
    array.map((value) => {
      push(value);
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@deleteButton").click();
    cy.get("@deleteButton")
      .invoke("attr", "class")
      .then((className) => expect(className).contains(loader));
    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[0]).should("have.text", "");
    });
  });

  it("Поведение кнопки - Очистить", () => {
    array.map((value) => {
      push(value);
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@clearButton").click();

    cy.wait(DELAY_IN_MS);
    cy.get("@input").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });
});
