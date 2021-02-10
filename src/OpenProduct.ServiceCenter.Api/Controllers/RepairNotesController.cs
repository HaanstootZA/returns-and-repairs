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
    public class RepairNotesController : ControllerBase
    {
        private readonly IRepairNoteRepository repairNoteRepository;
        private readonly ILogger<RepairNotesController> logger;

        public RepairNotesController(ILogger<RepairNotesController> logger, IRepairNoteRepository repairNoteRepository)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.repairNoteRepository = repairNoteRepository ?? throw new ArgumentNullException(nameof(repairNoteRepository));
        }

        [HttpGet("MostRecent", Name = "MostRecent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<RepairNote>> GetMostRecent()
        {
            this.logger.UnitOfWork("Finding a list of repair notes from the repository");
            IEnumerable<RepairNote> result = this.repairNoteRepository.GetMostRecent();

            return Ok(result);
        }
    }
}

