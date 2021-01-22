using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenProduct.ServiceCenter.Core;
using RestSharp;
using System.Collections.Generic;
using System.Net;
using TechTalk.SpecFlow;

namespace OpenProduct.ServiceCenter.Api.BehaviourTests.Steps
{
    [Binding]
    public class RepairNotesSteps
    {
        IRestClient restClient;
        IRestResponse<IEnumerable<RepairNote>> restResponse;

        [Given(@"A connection to the service center API")]
        public void GivenAConnectionToTheServiceCenterAPI()
        {
            restClient = new RestClient("http://servicecenter.com/");
        }
        
        [When(@"I make a GET request to the Repair Notes Controller")]
        public void WhenIMakeAGETRequestToTheRepairNotesController()
        {
            RestRequest restRequest = new RestRequest("api/RepairNotes", Method.GET, DataFormat.Json);
            this.restResponse = restClient.Get<IEnumerable<RepairNote>>(restRequest);
        }

        [Then(@"the API should return a list of existing repair notes")]
        public void ThenTheAPIShouldReturnAListOfExistingRepairNotes()
        {
            Assert.IsNotNull(restResponse);
            Assert.AreEqual(HttpStatusCode.OK, restResponse.StatusCode);
            Assert.IsNotNull(restResponse.Content);
        }
    }
}
