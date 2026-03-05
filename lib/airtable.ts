import { AirtableRecordType, CoffeeStoreType } from '@/types';

var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  'appzoOpuvXaJnVdec',
);

const table = base('coffee-stores');

const getMinifiedRecords = (records: Array<AirtableRecordType>) => {
  return records.map((record: AirtableRecordType) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

export const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findRecords);
};

export const createCoffeeStore = async (
  coffeeStore: CoffeeStoreType,
  id: string,
) => {
  const { name, address, voting = 0, imgUrl, type } = coffeeStore;
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address: `${address?.county}, ${address?.state}, ${address?.country}`,
              voting,
              imgUrl,
              type,
            },
          },
        ]);
        if (createRecords.length > 0) {
          console.log('Created a store with id', id);
          return getMinifiedRecords(createRecords);
        }
      } else {
        console.log('Coffee store exist');
        return records;
      }
    } else {
      console.error('Store id is missing');
    }
  } catch (error) {
    console.error('Error creating or finding a store', error);
  }
};

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        const record = records[0];
        const updatedVoting = record.voting + 1;
        const updatedRecord = await table.update([
          {
            id: record.recordId,
            fields: {
              voting: updatedVoting,
            },
          },
        ]);
        if (updatedRecord.length > 0) {
          console.log('Updated a store with id', id);
          return getMinifiedRecords(updatedRecord);
        }
      } else {
        console.log('Coffee store does not exist');
        return records;
      }
    } else {
      console.error('Store id is missing');
    }
  } catch (error) {
    console.error('Error upvoting a coffee store', error);
  }
};
