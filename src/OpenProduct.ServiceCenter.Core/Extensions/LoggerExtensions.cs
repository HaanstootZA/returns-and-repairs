using System;
using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.Logging;

namespace OpenProduct.ServiceCenter.Core.Extensions
{
    [ExcludeFromCodeCoverage]
    public static class LoggerExtensions
    {
        /// <summary>
        /// <para>Log a unit of work, this denotes a single step within the current process and should be have an associated unit test.</para>
        /// HINT: If you have a unit test for it, log a unit of work.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void UnitOfWork(this ILogger logger, string message, params object[] args)
        {
            logger.Log(LogLevel.Trace, eventId: 0, exception: null, message, args);
        }

        /// <summary>
        /// Log a thread sensitive unit of work
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void ThreadSensitive(this ILogger logger, string message, params object[] args)
        {
            logger.Log(LogLevel.Information, eventId: 0, exception: null, "Executing a THREAD SENSITIVE code block. Watch out for race conditions");
            if (!string.IsNullOrEmpty(message))
            {
                logger.Log(LogLevel.Trace, eventId: 0, exception: null, message, args);
            }
        }

        /// <summary>
        /// <para>If you reach any place within the code where you would like to add a breakpoint then log it accordingly</para>
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void Breakpoint(this ILogger logger, string message, params object[] args)
        {
            logger.Log(LogLevel.Debug, eventId: 0, exception: null, message, args);
        }

        /// <summary>
        /// <para>Log the expected behavior of a specific piece of code</para>
        /// <para>HINT: You would write a test to validate the expected behavior this piece of code.</para>
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void Behavior(this ILogger logger, string message, params object[] args)
        {
            logger.Log(LogLevel.Information, eventId: 0, exception: null, message, args);
        }

        /// <summary>
        /// Write a log entry for a piece of code that didn't return an acceptable result, but doesn't disrupt the proper execution of the program
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void NonCritical(this ILogger logger, string message, params object[] args)
        {
            logger.Log(LogLevel.Warning, eventId: 0, exception: null, message, args);
        }

        /// <summary>
        /// Write a log entry for a piece of code that threw an exception, but doesn't distrupt the proper execution of the program
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="exception"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void NonCritical(this ILogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(LogLevel.Warning, eventId: 0, exception, message, args);
        }

        /// <summary>
        /// Something unexpected happened that will need to be resolved
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="exception"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void Resolve(this ILogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(LogLevel.Error, eventId: 0, exception, message, args);
        }

        /// <summary>
        /// Something happened to cause the application to crash
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="exception"></param>
        /// <param name="message"></param>
        /// <param name="args"></param>
        public static void Crash(this ILogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(LogLevel.Critical, eventId: 0, exception, message, args);
        }
    }
}