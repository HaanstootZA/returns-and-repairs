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

        [Given(@"A connection an API connectiong")]
        public void GivenAConnectionAnAPIConnectiong()
        {
            restClient = new RestClient("http://servicecenter.com/");
        }
        
        [When(@"I call the Repair Notes Controller GET function")]
        public void WhenICallTheRepairNotesControllerGETFunction()
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
