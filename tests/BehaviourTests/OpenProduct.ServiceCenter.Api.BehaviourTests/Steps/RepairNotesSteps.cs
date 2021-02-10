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
        IRestRequest restRequest;

        [Given(@"A connection to the service center API")]
        public void GivenAConnectionToTheServiceCenterAPI()
        {
#if DEBUG
            this.restClient = new RestClient("https://localhost:44319");
            this.restClient.RemoteCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
#else
            this.restClient = new RestClient("https://servicecenter.com");
#endif
        }

        [When(@"I make a get request to the Repair Notes Controller")]
        public void WhenIMakeAGetRequestToTheRepairNotesController()
        {
            this.restRequest = new RestRequest("api/repairnotes", Method.GET, DataFormat.Json);
        }

        [Given(@"I have no arguments")]
        public void GivenIHaveNoArguments()
        {
            this.restRequest.Resource += "mostRecent";
            this.restResponse = restClient.Get<IEnumerable<RepairNote>>(restRequest);
        }

        [Then(@"the API should return a list of the most recent existing repair notes")]
        public void ThenTheAPIShouldReturnAListOfTheMostRecentExistingRepairNotes()
        {
            Assert.IsNotNull(restResponse);
            Assert.AreEqual(HttpStatusCode.OK, restResponse.StatusCode);
            Assert.IsNotNull(restResponse.Content);
        }
    }
}
