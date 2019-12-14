---
title: YAML Schema for Organizing Data
publishDate: 2019-12-14
---

I have an idea about using YAML Schema to organize data.

I came to this idea the other day when I was asked whether I had a certain vaccine in the past. All of a sudden, I wish I had organized my personal medical data in a structured way so that I could easily look it up. For easier discussion, let's use personal medical data as an example here.

First of all, I choose texts rather than database or any binary format because I want it to be readable and easy to maintain. I also want it to be organized, so I choose the YAML format where it's kind of both human- and machine-readable, yet doesn't require a lot of skeleton characters like JSON. On top of that, I add YAML Schema so that the data YAML file can be validated. It's also useful for auto-completion in editors that supports it. YAML Schema is based on JSON Schema, which is still work in progress. YAML Schema is also written in JSON at this moment.

Here is a snippet of YAML Schema that I use to organize my immunization history:

```JSON
"immunization": {
  "description": "Immunization history.",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "date": {
        "description": "Date of the immunization.",
        "type": "string"
      },
      "name": {
        "description": "Immunization name.",
        "type": "string"
      }
    },
    "required": ["date", "name"]
  },
  "uniqueItems": true
}
```

Basically, I'm defining an array named `immunization`. Each element of the array is an object that has two properties, `date` and `name`, which are both strings. I don't think we have date-time type at the moment, so I have to use strings for dates. I'm also declaring that the elements should be unique in the array.

With the above schema, I can add and validate the following section in my data YAML file:

```YAML
immunization:
  - date: 2019/12/13
    name: some vaccine 1
  - date: 2019/12/14
    name: some vaccine 2
```

Similarly, I can add definitions for surgery history and other medical information. For complete syntax about YAML Schema and JSON Schema, see [here](https://json-schema-everywhere.github.io/yaml).

I'm using VS Code with the YAML plugin. It takes a bit of time to configure, but after that, I get the auto-completion when I'm editing the data YAML file.

Finally, it's worth pointing out that although the example here is for personal medical data, the idea of using YAML Schema can be applied to other structured data as well.
