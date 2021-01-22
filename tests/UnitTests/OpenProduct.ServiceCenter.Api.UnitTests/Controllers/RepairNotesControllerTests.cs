using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenProduct.ServiceCenter.Api.Controllers;
using OpenProduct.ServiceCenter.DataRepository;
using System;
using Moq;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using OpenProduct.ServiceCenter.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace OpenProduct.ServiceCenter.Api.UnitTests.Controllers
{
    [TestClass]
    public class RepairNotesControllerTests
    {
        [TestMethod]
        public void TestConstructor()
        {
            Assert.IsNotNull(new RepairNotesController(Mock.Of<ILogger<RepairNotesController>>(), Mock.Of<IRepairNoteRepository>()));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void TestConstructorLoggerArgumentNullException()
        {
            Assert.IsNotNull(new RepairNotesController(null, Mock.Of<IRepairNoteRepository>()));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void TestConstructorRepositoryArgumentNullException()
        {
            Assert.IsNotNull(new RepairNotesController(Mock.Of<ILogger<RepairNotesController>>(), null));
        }

        [TestMethod]
        public void TestGetRepairNotes()
        {
            List<RepairNote> expectedRepairNotes = new List<RepairNote>
            {
                new RepairNote()
            };

            Mock<IRepairNoteRepository> repairNoteRepositoryMock = new Mock<IRepairNoteRepository>();
            repairNoteRepositoryMock
                .Setup(r => r.GetRepairNotes())
                .Returns(expectedRepairNotes)
                .Verifiable();

            RepairNotesController testController = new RepairNotesController(Mock.Of<ILogger<RepairNotesController>>(), repairNoteRepositoryMock.Object);
            ActionResult<IEnumerable<RepairNote>> actualRepairNotesResult = testController.GetRepairNotes();

            repairNoteRepositoryMock.Verify();

            Assert.IsNotNull(actualRepairNotesResult);
            Assert.IsInstanceOfType(actualRepairNotesResult.Result, typeof(OkObjectResult));
            Assert.AreEqual(expectedRepairNotes, ((OkObjectResult)actualRepairNotesResult.Result).Value);
        }
    }
}
