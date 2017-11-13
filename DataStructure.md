
DataStructure
-------------------

Schema: 
{
    tasks:{
        "type":"array"
        "items":[
            {
             "task_name":{"type":"string"},
             "description":{"type":"string"},
             "time":{"type":"integer"},
             "location":{"string"}
            }
        ]
    }
}

Example: 
{
    tasks:[
        {
        "task_name":"Kjøpe julegaver",
        "description":"Mangler julegaver til mamma, pappa, Per og Pål",
        "time":"14:00:00 12des2017",
        "location":"Arendal"
        }
    ]
}