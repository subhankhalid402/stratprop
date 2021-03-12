import busTypeTableMock from "./busTypeTableMock";
import MockUtils from "./mock.utils";

export default function mockBusTypes(mock) {

  mock.onPost("api/busTypes").reply(({ data }) => {
    const { busType } = JSON.parse(data);
    const { value = "", specId } = busType;
    const id = generateBusTypeId();
    const newBusType = {
      id,
      value,
      specId: +specId
    };
    
    busTypeTableMock.push(newBusType);
    return [200, { busType: newBusType }];
  });

  mock.onPost(/api\/busTypes\/find/).reply(config => {
    console.log(busTypeTableMock);
    const urls = config.url.split("/");
    const id = urls[2];
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const busTypes = busTypeTableMock;

    console.log(busTypes);
    const result = [];
    busTypes.forEach(el => result.push(wrapBusType(el)));
    const filterdBusTypes = mockUtils.baseFilter(result, queryParams);

    return [200, filterdBusTypes];
  });

  mock.onPost("api/busTypes/deleteBusTypes").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = busTypeTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        busTypeTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onGet(/api\/busTypes\/\d+/).reply(config => {
    const id = config.url.match(/api\/busTypes\/(\d+)/)[1];
    const spec = busTypeTableMock.find(el => el.id === +id);
    if (!spec) {
      return [400];
    }

    const busType = wrapBusType(spec);

    return [200, busType];
  });

  mock.onPut(/api\/busTypes\/\d+/).reply(config => {
    const id = config.url.match(/api\/busTypes\/(\d+)/)[1];
    const { busType } = JSON.parse(config.data);
    const index = busTypeTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    busTypeTableMock[index] = { ...busType };
    return [200];
  });

  mock.onDelete(/api\/busTypes\/\d+/).reply(config => {
    const id = config.url.match(/api\/busTypes\/(\d+)/)[1];
    const index = busTypeTableMock.findIndex(el => el.id === +id);
    busTypeTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateBusTypeId() {
  const ids = busTypeTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

function wrapBusType(busType) {
  const newSpec = { ...busType };
  newSpec.name = getSpecNameById(newSpec.specId);
  return newSpec;
}

function getSpecNameById(specId) {
  const specs = [
    "Seats",
    "Fuel Type",
    "Stock",
    "Door count",
    "Engine",
    "Transmission",
    "Drivetrain",
    "Combined MPG",
    "Warranty",
    "Wheels"
  ];
  return specs[specId];
}
