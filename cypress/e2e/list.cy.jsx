import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  circle,
  circleChanging,
  circleContent,
  circleDefault,
  circleModified,
  circleSmall,
  loader,
} from "../constants";

const getCirclesData = (array) => {
  cy.get(circle).then((item) => {
    cy.get(item)
      .children()
      .each((child) => {
        array.push(child.text());
      });
  });
};

describe("Тестирование алгоритма - Связный список", () => {
  beforeEach(() => {
    cy.visit("/list");
    cy.get("button[id='addHead']").as("addHeadButton");
    cy.get("button[id='addTail']").as("addTailButton");
    cy.get("button[id='deleteHead']").as("deleteHeadButton");
    cy.get("button[id='deleteTail']").as("deleteTailButton");
    cy.get("button[id='addIndex']").as("addIndexButton");
    cy.get("button[id='deleteIndex']").as("deleteIndexButton");
    cy.get("input[name='listValue']").as("listValueInput");
    cy.get("input[name='listIndex']").as("listIndexInput");
    cy.get(circle).as("circle");
    cy.get(circleContent).as("circleContent");
  });

  it("Если в инпуте пусто, то кнопки добавления, добавления и удаления по индексу недоступны", () => {
    cy.get("@listValueInput").should("have.value", "");
    cy.get("@listIndexInput").should("have.value", "");

    cy.get("@addHeadButton").should("be.disabled");
    cy.get("@addTailButton").should("be.disabled");
    cy.get("@deleteHeadButton").should("not.be.disabled");
    cy.get("@deleteTailButton").should("not.be.disabled");
    cy.get("@addIndexButton").should("be.disabled");
    cy.get("@deleteIndexButton").should("be.disabled");
  });

  it("Корректное добавление элемента в head", () => {
    cy.get("@listValueInput").type("50");
    cy.get("@addHeadButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@addHeadButton").click();
    cy.get("@addHeadButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(loader));
    cy.get("@circleContent").then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[0]).find(circleSmall).children().should("have.text", "50");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[0]).children().should("have.text", "50");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[0]).children().should("have.text", "50");
    });
  });

  it("Корректное добавление элемента в tail", () => {
    let arrayOfCircles = [];

    getCirclesData(arrayOfCircles);

    cy.get("@listValueInput").type("60");
    cy.get("@addTailButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@addTailButton").click();
    cy.get("@addTailButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(loader));
    cy.get("@circleContent").then((item) => {
      cy.get(item[arrayOfCircles.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[arrayOfCircles.length - 1])
        .find(circleSmall)
        .children()
        .should("have.text", "60");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item[arrayOfCircles.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[arrayOfCircles.length]).children().should("have.text", "60");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item[arrayOfCircles.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[arrayOfCircles.length]).children().should("have.text", "60");
    });
  });

  it("Корректное добавление элемента по индексу", () => {
    cy.get("@listValueInput").type("70");
    cy.get("@listIndexInput").type("2");
    cy.get("@addIndexButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@addIndexButton").click();
    cy.get("@addIndexButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(loader));

    cy.wait(DELAY_IN_MS);
    cy.get("@circleContent").then((item) => {
      cy.get(item["2"])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item["2"]).find(circleSmall).children().should("have.text", "70");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item["2"])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item["2"]).children().should("have.text", "70");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item["2"])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item["2"]).children().should("have.text", "70");
    });

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item["2"])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item["2"]).children().should("have.text", "70");
    });
  });

  it("Корректное удаления элемента из head", () => {
    let arrayOfCircles = [];

    getCirclesData(arrayOfCircles);

    cy.get("@deleteHeadButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@deleteHeadButton").click();
    cy.get("@deleteHeadButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(loader));

    cy.get("@circleContent").then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[0])
        .find(circleSmall)
        .children()
        .should("have.text", arrayOfCircles[0]);
    });

    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[1]).children().should("have.text", "");
    });
  });

  it("Корректное удаления элемента из tail", () => {
    let arrayOfCircles = [];

    getCirclesData(arrayOfCircles);

    cy.get("@deleteTailButton").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);
    cy.get("@deleteTailButton").click();
    cy.get("@deleteTailButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(loader));

    cy.get("@circleContent").then((item) => {
      cy.get(item[arrayOfCircles.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[arrayOfCircles.length - 1])
        .find(circleSmall)
        .children()
        .should("have.text", arrayOfCircles[arrayOfCircles.length - 1]);
    });

    cy.get("@circle").then((item) => {
      cy.get(item[arrayOfCircles.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[arrayOfCircles.length - 1])
        .children()
        .should("have.text", "");
    });
  });

  it("Корректное удаления элемента по индексу", () => {
    let arrayOfCircles = [];

    getCirclesData(arrayOfCircles);

    cy.get("@listIndexInput").type("0");

    cy.get("@deleteIndexButton").should("not.be.disabled");
    cy.get("@deleteIndexButton").click();
    cy.get("@deleteIndexButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(loader));

    cy.wait(DELAY_IN_MS);
    cy.get("@circle").then((item) => {
      cy.get(item["0"])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item["0"]).children().should("have.text", "");
    });

    cy.get("@circleContent").then((item) => {
      cy.get(item["0"])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item["0"])
        .find(circleSmall)
        .children()
        .should("have.text", arrayOfCircles["0"]);
    });
  });
});
