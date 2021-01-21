using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenProduct.ServiceCenter.Core;
using OpenProduct.ServiceCenter.Core.Extensions;
using OpenProduct.ServiceCenter.DataRepository;
using System;
using System.Collections.Generic;

namespace OpenProduct.ServiceCenter.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepairNoteController : ControllerBase
    {
        private readonly IRepairNoteRepository repairNoteRepository;
        private readonly ILogger<RepairNoteController> logger;

        public RepairNoteController(ILogger<RepairNoteController> logger, IRepairNoteRepository repairNoteRepository)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.repairNoteRepository = repairNoteRepository ?? throw new ArgumentNullException(nameof(repairNoteRepository));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<RepairNote>> GetRepairNotes()
        {
            this.logger.UnitOfWork("Finding a list of repair notes from the repository");
            IEnumerable<RepairNote> result = repairNoteRepository.GetRepairNotes();

            return Ok(result);
        }
    }
}

