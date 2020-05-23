#!/bin/bash
mongoimport --db=MarketDB --collection=Product --type=csv --headerline --file=/app/data/collection_product.csv